'use client';

// frontend/src/app/post/page.tsx

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { PostingFloatingItemProps } from "@/types/itemType";
import TokenDisplay from "@/components/post/TokenDisplay";
import SubmissionPostForm from "@/components/post/SubmissionPostForm";
import CommunityPostForm from "@/components/post/CommunityPostForm";
import ArchivePostForm from "@/components/post/ArchivePostForm";
import { usePostForm } from "@/hooks/usePostForm";
import { useImageManagement } from "@/hooks/useImageManagement";
import { usePostUIState } from "@/hooks/usePostUIState";
import { buildPromptFromLexical, extractTextFromLexical } from "@/utils/lexicalUtils";
import { textToLexicalJSON } from "@/utils/lexicalConverter";
import { mapPromptType } from "@/utils/typeMapper";
import { s3KeyToCloudFrontUrl } from "@/utils/imageUtils";
import { loadSubmissionData, loadCommunityPostData, loadArchiveArticleData } from "@/utils/articleLoader";
import { validateSubmission, validateArticle, validateArchiveFolder } from "@/utils/postValidator";
import { submitSubmission, submitCommunityPost, submitArchiveArticle } from "@/utils/postSubmitter";
import { PromptAPI } from "@/api/prompt";
import { ContestAPI } from "@/api/contest/contest";
import { UploadAPI } from "@/api/upload";
import { useSpaceStore } from "@/store/spaceStore";
import SpaceAPI from "@/api/space";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { authAPI } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";

/**
 * PostPageContent component (useSearchParams를 사용하는 내부 컴포넌트)
 */
function PostPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postType = searchParams.get("type"); // community, my-space, team-space, submission
  const folderIdParam = searchParams.get("folderId"); // 아카이브 폴더 ID
  const spaceIdParam = searchParams.get("spaceId"); // 팀 스페이스 ID
  const mode = searchParams.get("mode"); // edit 모드인지 확인
  const articleIdParam = searchParams.get("articleId"); // 수정할 게시글 ID (아카이브용)
  const postIdParam = searchParams.get("postId"); // 수정할 게시글 ID (커뮤니티용)
  const contestIdParam = searchParams.get("contestId"); // 대회 ID (산출물 제출용)
  const submissionIdParam = searchParams.get("submissionId"); // 수정할 산출물 ID (산출물 수정용)

  const isEditMode = mode === "edit" && (articleIdParam || postIdParam || submissionIdParam);
  const isSubmissionType = postType === 'submission';
  const isArchiveType = postType === 'my-space' || postType === 'team-space';

  // 커스텀 훅으로 상태 관리
  const { formState, actions: formActions } = usePostForm(folderIdParam);
  const { imageState, actions: imageActions } = useImageManagement();
  const { uiState, actions: uiActions } = usePostUIState();

  // 편의를 위한 구조 분해
  const {
    title,
    tags,
    descriptionState,
    usedPrompt,
    examplePrompt,
    answerPrompt,
    selectedCategory,
    selectedPromptType,
    selectedFolder,
    selectedFolderId,
    contestType,
  } = formState;

  const {
    generatedImageUrl,
    generatedImageKey,
    uploadedImageUrl,
    uploadedImageKey,
  } = imageState;

  const {
    isLoadingArticle,
    isLoadingTokens,
    isLoadingContest,
    remainingTokens,
  } = uiState;

  // Setter 함수 추출
  const {
    setTitle,
    setTags,
    setDescriptionState,
    setUsedPrompt,
    setExamplePrompt,
    setAnswerPrompt,
    setSelectedCategory,
    setSelectedPromptType,
    setSelectedFolder,
    setSelectedFolderId,
    setContestType,
  } = formActions;

  const {
    setGeneratedImageUrl,
    setGeneratedImageKey,
    setUploadedImageUrl,
    setUploadedImageKey,
  } = imageActions;

  const {
    setIsLoadingArticle,
    setIsGeneratingAnswer,
    setIsLoadingTokens,
    setIsLoadingContest,
    setPromptError,
    setExamplePromptError,
    setRemainingTokens,
  } = uiActions;

  const spaceStore = useSpaceStore();
  const folderStore = useArchiveFolderStore();
  
  // 페이지 로드 시 토큰 잔량 조회
  useEffect(() => {
    const fetchRemainingTokens = async () => {
      setIsLoadingTokens(true);
      try {
        const tokenData = await authAPI.getRestToken();
        setRemainingTokens(tokenData.usableToken);
      } catch (error) {
        console.error('토큰 잔량 조회 실패:', error);
        setRemainingTokens(null);
      } finally {
        setIsLoadingTokens(false);
      }
    };

    fetchRemainingTokens();
  }, [setIsLoadingTokens, setRemainingTokens]);

  // 산출물 제출 모드일 때 대회 정보 로드
  useEffect(() => {
    if (!isSubmissionType || !contestIdParam) return;
    
    const loadContestData = async () => {
      setIsLoadingContest(true);
      try {
        const contestId = parseInt(contestIdParam, 10);
        if (isNaN(contestId)) {
          alert('잘못된 대회 ID입니다.');
          router.back();
          return;
        }
        
        const { contestData } = await ContestAPI.getDetail(contestId);
        console.log('대회 정보 로드:', contestData.type, '전체 데이터:', contestData);

        const mappedType = mapPromptType(contestData.type);
        console.log('설정할 프롬프트 타입:', mappedType, '원본 타입:', contestData.type, '타입 체크:', typeof contestData.type);
        setSelectedPromptType(mappedType);
        setContestType(contestData.type);
      } catch (error) {
        console.error('대회 정보 로드 실패:', error);
        alert('대회 정보를 불러오는데 실패했습니다.');
        router.back();
      } finally {
        setIsLoadingContest(false);
      }
    };
    
    loadContestData();
  }, [isSubmissionType, contestIdParam, router, setIsLoadingContest, setSelectedPromptType, setContestType]);

  // Zustand store에서 폴더 리스트 가져오기
  const allFolders = folderStore.allFolderList;
  const pinnedFolders = allFolders.filter(folder => folder.isPinned);
  const normalFolders = allFolders.filter(folder => !folder.isPinned);

  // type=my-space일 때 내 스페이스 폴더 로드 및 URL 파라미터의 folderId로 폴더 이름 찾기
  useEffect(() => {
    if (!isArchiveType) return;

    // type=my-space일 때 항상 내 스페이스 폴더를 로드
    const loadMySpaceFolders = async () => {
      if (postType === 'my-space') {
        try {
          const { user } = useAuthStore.getState();
          if (!user?.personalSpaceId) return;

          const foldersData = await SpaceAPI.getSpaceArchiveFoldersData(user.personalSpaceId);
          console.log('API에서 받은 폴더 데이터:', foldersData);
          if (foldersData?.folders) {
            console.log('폴더 색상 정보:', foldersData.folders.map(f => ({ name: f.name, color: f.color })));
            folderStore.setAllFolderList(foldersData.folders);
          }
        } catch (error) {
          console.error('내 스페이스 폴더 로드 실패:', error);
        }
      }
    };

    loadMySpaceFolders();
  }, [postType, isArchiveType]);

  // URL 파라미터의 folderId로 폴더 이름 찾기
  useEffect(() => {
    if (!isArchiveType || !selectedFolderId) return;

    const folder = allFolders.find(f => f.folderId === selectedFolderId);
    if (folder) {
      setSelectedFolder(folder.name);
    }
  }, [isArchiveType, selectedFolderId, allFolders, setSelectedFolder]);

  // 수정 모드일 때 또는 아카이브로 이동할 때 기존 게시글 데이터 로드
  useEffect(() => {
    // 아카이브로 이동할 때 (type=my-space && postId 있음) 또는 수정 모드일 때
    const shouldLoadData = isEditMode || (postType === 'my-space' && postIdParam);
    if (!shouldLoadData) return;

    const loadArticleData = async () => {
      setIsLoadingArticle(true);
      try {
        // 산출물 수정 모드
        if (isSubmissionType && submissionIdParam && contestIdParam) {
          const contestId = parseInt(contestIdParam, 10);
          const submissionId = parseInt(submissionIdParam, 10);
          if (isNaN(contestId) || isNaN(submissionId)) {
            alert('잘못된 대회 ID 또는 산출물 ID입니다.');
            router.back();
            return;
          }

          await loadSubmissionData(contestId, submissionId, {
            setSelectedPromptType,
            setContestType,
            setDescriptionState,
            setUsedPrompt,
            setAnswerPrompt,
            setUploadedImageUrl,
            setUploadedImageKey,
            setGeneratedImageUrl,
            setGeneratedImageKey,
          });

          setIsLoadingArticle(false);
          return;
        }

        // 커뮤니티 게시글 수정 모드 또는 아카이브로 이동할 때
        if (postIdParam && (postType === 'community' || postType === 'my-space')) {
          const postId = parseInt(postIdParam, 10);
          if (isNaN(postId)) {
            alert('잘못된 게시글 ID입니다.');
            router.back();
            return;
          }

          await loadCommunityPostData(postId, {
            setSelectedPromptType,
            setSelectedCategory,
            setTitle,
            setTags,
            setDescriptionState,
            setUsedPrompt,
            setExamplePrompt,
            setAnswerPrompt,
            setUploadedImageUrl,
            setUploadedImageKey,
          });

          setIsLoadingArticle(false);
          return;
        }

        // 아카이브 게시글 수정 모드
        if (articleIdParam) {
          // type에 따라 올바른 spaceId 가져오기
          let spaceId: number;
          if (postType === 'my-space') {
            // 내 스페이스일 때는 authStore에서 personalSpaceId 가져오기
            const { user } = useAuthStore.getState();
            if (!user?.personalSpaceId) {
              alert('내 스페이스 정보를 찾을 수 없습니다.');
              router.back();
              return;
            }
            spaceId = user.personalSpaceId;
          } else {
            // 팀 스페이스일 때는 spaceStore에서 가져오기
            const teamSpaceId = spaceStore.currentSpace?.spaceId;
            if (!teamSpaceId) {
              alert('팀 스페이스 정보를 찾을 수 없습니다.');
              router.back();
              return;
            }
            spaceId = teamSpaceId;
          }

          const articleId = parseInt(articleIdParam, 10);
          if (isNaN(articleId)) {
            alert('잘못된 게시글 ID입니다.');
            router.back();
            return;
          }

          await loadArchiveArticleData(spaceId, articleId, {
            setSelectedPromptType,
            setTitle,
            setTags,
            setDescriptionState,
            setUsedPrompt,
            setExamplePrompt,
            setAnswerPrompt,
            setUploadedImageUrl,
            setUploadedImageKey,
          });
        }
      } catch (error) {
        console.error('게시글 로드 실패:', error);
        alert('게시글을 불러오는데 실패했습니다.');
        router.back();
      } finally {
        setIsLoadingArticle(false);
      }
    };

    loadArticleData();
  }, [
    isEditMode,
    articleIdParam,
    postIdParam,
    submissionIdParam,
    contestIdParam,
    isSubmissionType,
    postType,
    spaceStore.currentSpace?.spaceId,
    router,
    setIsLoadingArticle,
    setSelectedPromptType,
    setContestType,
    setDescriptionState,
    setUsedPrompt,
    setAnswerPrompt,
    setUploadedImageUrl,
    setUploadedImageKey,
    setGeneratedImageUrl,
    setGeneratedImageKey,
    setSelectedCategory,
    setTitle,
    setTags,
    setExamplePrompt,
  ]);

  // 폴더 변경 시 쿼리 파라미터 업데이트
  const handleFolderChange = (newFolder: string, newFolderId : number) => {
    setSelectedFolder(newFolder);
    setSelectedFolderId(newFolderId);

    // 쿼리 파라미터 업데이트
    const params = new URLSearchParams(searchParams.toString());
    params.set("folder", newFolder);

    //현재 폴더 설정
    folderStore.currentFolder = allFolders.find(folder => folder.folderId === newFolderId) || null;
    //왜냐면 이걸 해줘야... space board header에서 반영 됨

    router.replace(`/post?${params.toString()}`, { scroll: false });
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    // 산출물 제출 모드일 때는 다른 검증
    if (isSubmissionType) {
      // 검증
      const validation = validateSubmission({
        descriptionState,
        usedPrompt,
        answerPrompt,
        selectedPromptType,
        generatedImageKey,
        uploadedImageKey,
      });

      if (!validation.valid) {
        alert(validation.error);
        return;
      }

      // 이미지 키 상태 확인 (디버깅용)
      console.log('제출 시 이미지 키 상태 확인:', {
        generatedImageKey,
        uploadedImageKey,
        generatedImageUrl,
        uploadedImageUrl,
        answerPrompt: answerPrompt.trim()
      });

      // 산출물 제출/수정 API 호출
      if (!contestIdParam) {
        alert('대회 ID가 없습니다.');
        return;
      }

      try {
        const contestId = parseInt(contestIdParam, 10);
        if (isNaN(contestId)) {
          alert('잘못된 대회 ID입니다.');
          return;
        }

        const submissionId = submissionIdParam ? parseInt(submissionIdParam, 10) : undefined;

        await submitSubmission({
          contestId,
          selectedPromptType,
          descriptionState,
          usedPrompt,
          answerPrompt,
          uploadedImageKey,
          generatedImageKey,
          uploadedImageUrl,
          generatedImageUrl,
          isEditMode: !!isEditMode,
          submissionId,
          router,
        });
      } catch (error) {
        console.error('산출물 제출/수정 실패:', error);
        alert(error instanceof Error ? error.message : '산출물 제출/수정에 실패했습니다.');
      }
      return;
    }

    // 기존 검증 (커뮤니티/아카이브 게시글)
    const validation = validateArticle({
      title,
      descriptionState,
      usedPrompt,
      selectedPromptType,
      generatedImageKey,
      uploadedImageKey,
    });

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    try {
      // API 호출
      // 일반 게시글 or 아카이브 게시글 분기
      if(!isArchiveType){
        // 커뮤니티 게시글 제출
        const postId = postIdParam ? parseInt(postIdParam, 10) : undefined;

        await submitCommunityPost({
          title,
          descriptionState,
          usedPrompt,
          examplePrompt,
          answerPrompt,
          selectedCategory,
          selectedPromptType,
          tags,
          uploadedImageKey,
          generatedImageKey,
          isEditMode: !!isEditMode,
          postId,
          router,
        });
      }else{
        // 아카이브 게시글 생성/수정
        const folderValidation = validateArchiveFolder(selectedFolderId);
        if (!folderValidation.valid) {
          alert(folderValidation.error);
          return;
        }

        // type에 따라 올바른 spaceId 가져오기
        let spaceId: number | undefined;
        if (postType === 'my-space') {
          // 내 스페이스일 때는 authStore에서 personalSpaceId 가져오기
          const { user } = useAuthStore.getState();
          spaceId = user?.personalSpaceId;
        } else {
          // 팀 스페이스일 때는 spaceStore에서 가져오기
          spaceId = spaceStore.currentSpace?.spaceId;
        }

        const articleId = articleIdParam ? parseInt(articleIdParam, 10) : undefined;

        await submitArchiveArticle({
          title,
          descriptionState,
          usedPrompt,
          examplePrompt,
          answerPrompt,
          selectedPromptType,
          tags,
          uploadedImageKey,
          generatedImageKey,
          selectedFolderId: selectedFolderId!,
          postType,
          spaceId,
          isEditMode: !!isEditMode,
          articleId,
          router,
        });
      }

    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert(error instanceof Error ? error.message : '게시글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 검증 (예: 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.');
      return;
    }

    try {
      // 1단계: presigned URL 받기
      const uploadData = await UploadAPI.getImagesS3Upload(file.name);
      if (!uploadData) {
        throw new Error('Presigned URL을 받아오지 못했습니다.');
      }

      // 2단계: S3에 이미지 업로드
      const uploadResult = await UploadAPI.uploadImageToS3({
        presignedUrl: uploadData.presignedUrl,
        file: file,
      });

      if (!uploadResult || !uploadResult.ok) {
        throw new Error('S3 업로드에 실패했습니다.');
      }

      // 업로드된 이미지 정보 저장
      // CloudFront URL 생성 (key를 사용)
      const cloudfrontUrl = s3KeyToCloudFrontUrl(uploadData.key);

      console.log('이미지 업로드 성공:', {
        key: uploadData.key,
        cloudfrontUrl,
        uploadData
      });
      
      // 기존 AI 생성 이미지 제거 (단일 이미지만 허용)
      setGeneratedImageUrl("");
      setGeneratedImageKey("");
      
      // 새로운 업로드 이미지 설정
      setUploadedImageUrl(cloudfrontUrl);
      setUploadedImageKey(uploadData.key);
      
      console.log('이미지 상태 업데이트:', { 
        uploadedImageUrl: cloudfrontUrl, 
        uploadedImageKey: uploadData.key 
      });

      console.log('이미지 업로드 성공:', uploadData);
      alert('이미지가 성공적으로 업로드되었습니다!');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAISubmit = async () => {
    console.log('handleAISubmit 호출:', { selectedPromptType, isSubmissionType, contestType });
    
    // 입력 검증
    if (selectedPromptType == 'text' && !isSubmissionType && (!usedPrompt || !examplePrompt)) {
      alert('사용 프롬프트와 예시 질문을 모두 입력해주세요.');
      return;
    }
    else if (selectedPromptType == 'text' && isSubmissionType && !usedPrompt) {
      alert('프롬프트를 입력해주세요.');
      return;
    }
    else if(selectedPromptType == 'image' && !usedPrompt){
      alert('사용 프롬프트를 입력해주세요')
      return;
    }

    setIsGeneratingAnswer(true);

    try {

      

      if(selectedPromptType === 'text'){
        // Lexical JSON에서 텍스트 추출
        let systemMessage: string;
        let userMessage: string;
        
        if (isSubmissionType) {
          // submission 타입일 때는 프롬프트만 사용하고, 프롬프트를 exampleQuestion으로도 사용
          const promptText = extractTextFromLexical(usedPrompt);
          systemMessage = promptText;
          userMessage = promptText; // 프롬프트를 그대로 exampleQuestion으로 사용
        } else {
          // 일반 타입일 때는 기존대로
          const result = buildPromptFromLexical(usedPrompt, examplePrompt);
          systemMessage = result.systemMessage;
          userMessage = result.userMessage;
        }

        // PromptAPI를 통해 백엔드 호출
        const response = await PromptAPI.postTextPrompt({
          prompt: systemMessage,
          exampleQuestion: userMessage,
        });
      
      // 응답을 answerPrompt에 설정 (Lexical JSON 형식으로 변환)
      const lexicalAnswer = {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: response.exampleAnswer || '',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      };
      
      console.log('AI 응답:', response.exampleAnswer );

      setAnswerPrompt(JSON.stringify(lexicalAnswer));


      } else if (selectedPromptType === 'image'){
       const { systemMessage } = buildPromptFromLexical(usedPrompt);
        console.log("system ",systemMessage);
       const response = await PromptAPI.postImagePrompt({
          prompt: systemMessage,
        })

        console.log('AI 이미지 생성 응답:', response);

        //그냥 이미지 URL
        const url = response.cloudfrontUrl;

        //back 에 넣어야 할 image key (s3 key)
        const key = response.key;
        
        // 키가 없으면 에러
        if (!key || key.trim() === '') {
          console.error('이미지 키가 없음:', response);
          alert('이미지 생성에 실패했습니다. 키가 없습니다.');
          setIsGeneratingAnswer(false);
          return;
        }
        
        console.log('AI 이미지 생성 성공:', { 
          url, 
          key, 
          response 
        });

        // 기존 업로드된 이미지 제거 (단일 이미지만 허용)
        setUploadedImageUrl("");
        setUploadedImageKey("");
        
        // AI 생성 이미지 상태 업데이트
        setGeneratedImageUrl(url);
        setGeneratedImageKey(key);
        
        console.log('AI 이미지 상태 업데이트 완료:', { 
          url, 
          key 
        });

      } 


      alert('AI 응답이 생성되었습니다!');

      // AI 생성 후 토큰 잔량 업데이트
      try {
        const tokenData = await authAPI.getRestToken();
        setRemainingTokens(tokenData.usableToken);
      } catch (error) {
        console.error('토큰 잔량 업데이트 실패:', error);
      }

    } catch (error) {
      console.error('AI 생성 요청 실패:', error);
      alert('AI 응답 생성에 실패했습니다. 콘솔을 확인하세요.');
    } finally {
      setIsGeneratingAnswer(false);
    }
  }



  // Todo : 실제 사용할 아이콘으로 변경 예정
  // 간단한 아이콘 생성 함수
  const createIcon = (iconPath: string) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
    </svg>
  );

  // 카테고리 데이터
  const categoryItems: PostingFloatingItemProps[] = [
    {
      id: "work",
      icon: createIcon("M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"),
      label: "업무",
      value: "work",
    },
    {
      id: "dev",
      icon: createIcon("M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"),
      label: "개발",
      value: "dev",
    },
    {
      id: "design",
      icon: createIcon("M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"),
      label: "디자인/창작",
      value: "design",
    },
    {
      id: "job",
      icon: createIcon("M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"),
      label: "취업",
      value: "job",
    },
    {
      id: "edu",
      icon: createIcon("M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"),
      label: "교육",
      value: "edu",
    },
    {
      id: "life",
      icon: createIcon("M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"),
      label: "일상",
      value: "life",
    },
    {
      id: "etc",
      icon: createIcon("M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"),
      label: "기타",
      value: "etc",
    },
  ];

  // 프롬프트 타입 데이터
  const promptTypeItems: PostingFloatingItemProps[] = [
    {
      id: "text",
      icon: createIcon("M4 6h16M4 10h16M4 14h8M4 18h8"),
      label: "텍스트",
      value: "text",
    },
    {
      id: "image",
      icon: createIcon("M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"),
      label: "이미지",
      value: "image",
    },
  ];

  // 로딩 중일 때
  if (isLoadingArticle) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-gray-600">게시글을 불러오는 중...</div>
      </div>
    );
  }

  // 공통 Props
  const baseProps = {
    formState,
    imageState,
    uiState,
    onTitleChange: setTitle,
    onTagsChange: setTags,
    onDescriptionChange: setDescriptionState,
    onUsedPromptChange: setUsedPrompt,
    onExamplePromptChange: setExamplePrompt,
    onAnswerPromptChange: setAnswerPrompt,
    onCategoryChange: setSelectedCategory,
    onPromptTypeChange: setSelectedPromptType,
    onImageUpload: handleImageUpload,
    onGeneratedImageRemove: () => {
      setGeneratedImageUrl("");
      setGeneratedImageKey("");
    },
    onUploadedImageRemove: () => {
      setUploadedImageUrl("");
      setUploadedImageKey("");
    },
    onAISubmit: handleAISubmit,
    onSubmit: handleSubmit,
    onPromptErrorChange: setPromptError,
    onExamplePromptErrorChange: setExamplePromptError,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* 토큰 잔량 표시 - Sticky */}
      <TokenDisplay remainingTokens={remainingTokens} isLoading={isLoadingTokens} />

      <div className="max-w-7xl mx-auto px-4">
        {/* 모드별 컴포넌트 렌더링 */}
        {isSubmissionType ? (
          <SubmissionPostForm
            {...baseProps}
            isLoadingContest={isLoadingContest}
          />
        ) : isArchiveType ? (
          <ArchivePostForm
            {...baseProps}
            promptTypeItems={promptTypeItems}
            selectedFolder={selectedFolder}
            onFolderChange={handleFolderChange}
            pinnedFolders={pinnedFolders}
            normalFolders={normalFolders}
          />
        ) : (
          <CommunityPostForm
            {...baseProps}
            categoryItems={categoryItems}
            promptTypeItems={promptTypeItems}
          />
        )}
      </div>
    </div>
  );
}

/**
 * PostPage component (Suspense로 감싼 메인 컴포넌트)
 * @description PostPage component is a post page component that displays the post page content
 * @returns {React.ReactNode}
 */
export default function PostPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    }>
      <PostPageContent />
    </Suspense>
  );
}
