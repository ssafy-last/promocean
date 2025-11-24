'use client';

// frontend/src/app/post/page.tsx

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import TokenDisplay from "@/components/etc/TokenDisplay";
import SubmissionPostForm from "@/components/form/SubmissionPostForm";
import CommunityPostForm from "@/components/form/CommunityPostForm";
import ArchivePostForm from "@/components/form/ArchivePostForm";
import { usePostForm } from "@/hooks/usePostForm";
import { useImageManagement } from "@/hooks/useImageManagement";
import { usePostUIState } from "@/hooks/usePostUIState";
import { usePostDataLoader } from "@/hooks/usePostDataLoader";
import { CATEGORY_ITEMS, PROMPT_TYPE_ITEMS } from "@/constants/postFormConstants";
import { generateTextPrompt, generateImagePrompt } from "@/utils/aiPromptHandler";
import { handleImageFileSelect } from "@/utils/imageUploader";
import { handleUnifiedSubmit } from "@/utils/unifiedSubmitHandler";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { authAPI } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { SpaceAPI } from "@/api/space";

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

  const isEditMode = mode === "edit" && !!(articleIdParam || postIdParam || submissionIdParam);
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

  // 대회 정보 및 게시글 데이터 로드 (usePostDataLoader 훅 사용)
  usePostDataLoader({
    isEditMode,
    isSubmissionType,
    postType,
    contestIdParam,
    submissionIdParam,
    postIdParam,
    articleIdParam,
    spaceIdParam,
    setIsLoadingArticle,
    setIsLoadingContest,
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
  });

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

  // 제출 핸들러 (통합 제출 유틸리티 사용)
  const handleSubmit = async () => {
    await handleUnifiedSubmit({
      isSubmissionType,
      isArchiveType,
      isEditMode: !!isEditMode,
      title,
      tags,
      descriptionState,
      usedPrompt,
      examplePrompt,
      answerPrompt,
      selectedCategory,
      selectedPromptType,
      selectedFolderId,
      generatedImageKey,
      uploadedImageKey,
      generatedImageUrl,
      uploadedImageUrl,
      contestIdParam,
      submissionIdParam,
      postIdParam,
      articleIdParam,
      spaceIdParam,
      postType,
      router,
    });
  };

  // 이미지 업로드 핸들러 (이미지 업로드 유틸리티 사용)
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = await handleImageFileSelect(event);

    if (!result) return;

    if (result.success && result.imageUrl && result.imageKey) {
      // 기존 AI 생성 이미지 제거 (단일 이미지만 허용)
      setGeneratedImageUrl("");
      setGeneratedImageKey("");

      // 새로운 업로드 이미지 설정
      setUploadedImageUrl(result.imageUrl);
      setUploadedImageKey(result.imageKey);

      alert('이미지가 성공적으로 업로드되었습니다!');
    } else {
      alert(result.error || '이미지 업로드에 실패했습니다.');
    }
  };

  // AI 응답 생성 핸들러 (AI 프롬프트 유틸리티 사용)
  const handleAISubmit = async () => {
    setIsGeneratingAnswer(true);

    try {
      if (selectedPromptType === 'text') {
        const result = await generateTextPrompt({
          usedPrompt,
          examplePrompt,
          isSubmissionType,
        });

        if (result.success && result.data?.answer) {
          setAnswerPrompt(result.data.answer);
          alert('AI 응답이 생성되었습니다!');
        } else {
          alert(result.error || 'AI 응답 생성에 실패했습니다.');
        }
      } else if (selectedPromptType === 'image') {
        const result = await generateImagePrompt({ usedPrompt });

        if (result.success && result.data) {
          // 기존 업로드된 이미지 제거 (단일 이미지만 허용)
          setUploadedImageUrl("");
          setUploadedImageKey("");

          // AI 생성 이미지 상태 업데이트
          setGeneratedImageUrl(result.data.imageUrl!);
          setGeneratedImageKey(result.data.imageKey!);

          alert('AI 이미지가 생성되었습니다!');
        } else {
          alert(result.error || 'AI 이미지 생성에 실패했습니다.');
        }
      }

      // AI 생성 후 토큰 잔량 업데이트
      try {
        const tokenData = await authAPI.getRestToken();
        setRemainingTokens(tokenData.usableToken);
      } catch (error) {
        console.error('토큰 잔량 업데이트 실패:', error);
      }
    } catch (error) {
      console.error('AI 생성 요청 실패:', error);
      alert('AI 응답 생성에 실패했습니다.');
    } finally {
      setIsGeneratingAnswer(false);
    }
  }

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
            promptTypeItems={PROMPT_TYPE_ITEMS}
            selectedFolder={selectedFolder}
            onFolderChange={handleFolderChange}
            pinnedFolders={pinnedFolders}
            normalFolders={normalFolders}
          />
        ) : (
          <CommunityPostForm
            {...baseProps}
            categoryItems={CATEGORY_ITEMS}
            promptTypeItems={PROMPT_TYPE_ITEMS}
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
