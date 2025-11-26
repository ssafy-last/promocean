// frontend/src/utils/postSubmitter.ts

import { PostAPI, PostArticleRequest } from "@/api/post";
import { SubmissionAPI } from "@/api/contest/submission";
import SpaceAPI from "@/api/space";
import { useAuthStore } from "@/store/authStore";
import { convertLexicalToMarkdown, extractTextFromLexical } from "@/utils/lexicalUtils";
import { extractS3KeyFromUrl } from "@/utils/imageUtils";
import { categoryStringToEnum, promptTypeStringToEnum } from "@/types/postEnum";

/**
 * 산출물 제출/수정 핸들러
 */
export async function submitSubmission(params: {
  contestId: number;
  selectedPromptType: string;
  descriptionState: string;
  usedPrompt: string;
  answerPrompt: string;
  uploadedImageKey: string;
  generatedImageKey: string;
  uploadedImageUrl: string;
  generatedImageUrl: string;
  isEditMode: boolean;
  submissionId?: number;
  router: any;
}) {
  const {
    contestId,
    selectedPromptType,
    descriptionState,
    usedPrompt,
    answerPrompt,
    uploadedImageKey,
    generatedImageKey,
    uploadedImageUrl,
    generatedImageUrl,
    isEditMode,
    submissionId,
    router,
  } = params;

  const description = convertLexicalToMarkdown(descriptionState);
  const prompt = convertLexicalToMarkdown(usedPrompt);
  let result = '';

  if (selectedPromptType === 'text') {
    result = convertLexicalToMarkdown(answerPrompt);
  } else if (selectedPromptType === 'image') {
    // 이미지 타입: 이미지 키 우선순위 (업로드 > AI 생성 > 텍스트)
    const currentUploadedKey = uploadedImageKey;
    const currentGeneratedKey = generatedImageKey;

    console.log('이미지 키 확인 (제출 시점):', {
      currentUploadedKey,
      currentGeneratedKey,
      uploadedImageUrl,
      generatedImageUrl
    });

    if (currentUploadedKey && currentUploadedKey.trim()) {
      result = currentUploadedKey.trim();
    } else if (currentGeneratedKey && currentGeneratedKey.trim()) {
      result = currentGeneratedKey.trim();
    } else if (answerPrompt.trim()) {
      // 텍스트로 입력된 경우 (S3 key 형식일 수도 있음)
      const textResult = extractTextFromLexical(answerPrompt);
      // 이미 CloudFront URL이면 키로 변환, 아니면 그대로 사용
      result = extractS3KeyFromUrl(textResult) || textResult;
    }

    console.log('이미지 제출 데이터:', {
      uploadedImageKey: currentUploadedKey,
      generatedImageKey: currentGeneratedKey,
      result,
      resultLength: result?.length,
      uploadedImageUrl,
      generatedImageUrl,
      selectedPromptType
    });

    // 이미지 타입인데 result가 비어있으면 에러
    if (!result || result.trim() === '') {
      console.error('이미지 키가 비어있음:', {
        uploadedImageKey: currentUploadedKey,
        generatedImageKey: currentGeneratedKey,
        answerPrompt: answerPrompt.trim(),
        selectedPromptType,
        uploadedImageUrl,
        generatedImageUrl
      });
      throw new Error('이미지를 업로드하거나 AI로 생성해주세요.');
    }

    console.log('최종 result 값:', result, '타입:', typeof result, '길이:', result.length);
  }

  // API 호출 전 최종 확인
  console.log('제출 전 최종 데이터:', {
    contestId,
    prompt,
    description,
    result,
    selectedPromptType,
    isEditMode,
    submissionId
  });

  // 산출물 수정 모드
  if (isEditMode && submissionId) {
    console.log('수정 API 호출:', { contestId, submissionId, prompt, description, result });
    await SubmissionAPI.update(contestId, submissionId, prompt, description, result);

    console.log('산출물 수정 성공');
    alert('산출물이 성공적으로 수정되었습니다!');

    // 성공 후 대회 상세 페이지로 이동
    router.push(`/contest/${contestId}`);
  } else {
    // 산출물 생성 모드
    const requestBody = {
      prompt,
      description,
      result,
    };
    console.log('생성 API 호출:', { contestId, ...requestBody });
    console.log('요청 본문 (JSON):', JSON.stringify(requestBody));
    const response = await SubmissionAPI.create(contestId, prompt, description, result);

    console.log('산출물 제출 성공:', response);
    alert('산출물이 성공적으로 제출되었습니다!');

    // 성공 후 대회 상세 페이지로 이동
    router.push(`/contest/${contestId}`);
  }
}

/**
 * 커뮤니티 게시글 제출/수정 핸들러
 */
export async function submitCommunityPost(params: {
  title: string;
  descriptionState: string;
  usedPrompt: string;
  examplePrompt: string;
  answerPrompt: string;
  selectedCategory: string;
  selectedPromptType: string;
  tags: string[];
  uploadedImageKey: string;
  generatedImageKey: string;
  isEditMode: boolean;
  postId?: number;
  router: any;
}) {
  const {
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
    isEditMode,
    postId,
    router,
  } = params;

  // Lexical JSON에서 마크다운으로 변환
  const description = convertLexicalToMarkdown(descriptionState);
  const prompt = convertLexicalToMarkdown(usedPrompt);

  // API 요청 데이터 구성 (기본 필드)
  const requestData: PostArticleRequest = {
    title: title.trim(),
    description: description.trim(),
    category: categoryStringToEnum(selectedCategory),
    prompt: prompt.trim(),
    promptType: promptTypeStringToEnum(selectedPromptType),
    tags: tags,
    sampleQuestion: '', // 기본값
    sampleAnswer: '', // 기본값
  };

  // 프롬프트 타입에 따라 추가 필드 설정
  if (selectedPromptType === 'text') {
    // 예시 질문과 답변은 선택 사항
    const sampleQuestion = examplePrompt.trim() ? convertLexicalToMarkdown(examplePrompt) : '';
    const sampleAnswer = answerPrompt.trim() ? convertLexicalToMarkdown(answerPrompt) : '';

    // 예시 질문이 있을 경우에만 길이 검증
    if (sampleQuestion && sampleQuestion.length > 200) {
      throw new Error('예시 질문은 200자 이하로 입력해주세요.');
    }

    requestData.sampleQuestion = sampleQuestion.trim();
    requestData.sampleAnswer = sampleAnswer.trim();
  } else if (selectedPromptType === 'image') {
    // 이미지 타입: 업로드된 이미지 우선, 없으면 AI 생성 이미지
    requestData.filePath = uploadedImageKey || generatedImageKey;
  }

  console.log('제출 데이터:', requestData);

  // 커뮤니티 게시글 수정 모드
  if (isEditMode && postId) {
    const response = await PostAPI.putArticlePost(postId, requestData);

    console.log('게시글 수정 성공:', response);
    alert(`게시글이 성공적으로 수정되었습니다!`);

    // 성공 후 상세 페이지로 이동
    router.push(`/community/${postId}`);
  } else {
    // 커뮤니티 게시글 생성 모드
    const response = await PostAPI.postArticlePost(requestData);

    console.log('게시글 생성 성공:', response);
    alert(`게시글이 성공적으로 등록되었습니다!\n게시글 ID: ${response.postId}`);

    // 성공 후 이동 (커뮤니티 페이지 또는 상세 페이지로)
    router.push(`/community/${response.postId}`);
  }
}

/**
 * 아카이브 게시글 제출/수정 핸들러
 */
export async function submitArchiveArticle(params: {
  title: string;
  descriptionState: string;
  usedPrompt: string;
  examplePrompt: string;
  answerPrompt: string;
  selectedPromptType: string;
  tags: string[];
  uploadedImageKey: string;
  generatedImageKey: string;
  selectedFolderId: number;
  postType: string;
  spaceId?: number;
  isEditMode: boolean;
  articleId?: number;
  router: any;
}) {
  const {
    title,
    descriptionState,
    usedPrompt,
    examplePrompt,
    answerPrompt,
    selectedPromptType,
    tags,
    uploadedImageKey,
    generatedImageKey,
    selectedFolderId,
    postType,
    spaceId: providedSpaceId,
    isEditMode,
    articleId,
    router,
  } = params;

  // Lexical JSON에서 마크다운으로 변환
  const description = convertLexicalToMarkdown(descriptionState);
  const prompt = convertLexicalToMarkdown(usedPrompt);

  // type에 따라 올바른 spaceId 가져오기
  let spaceId: number;
  if (providedSpaceId) {
    spaceId = providedSpaceId;
  } else {
    if (postType === 'my-space') {
      // 내 스페이스일 때는 authStore에서 personalSpaceId 가져오기
      const { user } = useAuthStore.getState();
      if (!user?.personalSpaceId) {
        throw new Error('내 스페이스 정보를 찾을 수 없습니다.');
      }
      spaceId = user.personalSpaceId;
    } else {
      throw new Error('팀 스페이스 정보를 찾을 수 없습니다.');
    }
  }

  const articlePayload = {
    description: description.trim(),
    title: title.trim(),
    prompt: prompt.trim(),
    type: promptTypeStringToEnum(selectedPromptType),
    exampleQuestion: examplePrompt.trim() ? convertLexicalToMarkdown(examplePrompt).trim() : '',
    exampleAnswer: answerPrompt.trim() ? convertLexicalToMarkdown(answerPrompt).trim() : '',
    filePath: uploadedImageKey || generatedImageKey || '',
    tags: tags
  };

  if (isEditMode && articleId) {
    // 수정 모드
    console.log("아카이브 게시글 수정 로직 실행", { spaceId, folderId: selectedFolderId, articleId });

    const response = await SpaceAPI.putArchiveArticle(
      spaceId,
      selectedFolderId,
      articleId,
      articlePayload
    );

    if (response) {
      console.log('아카이브 게시글 수정 성공:', response);
      alert('게시글이 성공적으로 수정되었습니다!');

      // 성공 후 상세 페이지로 이동
      if (postType === 'my-space') {
        router.push(`/my-space/archive/${selectedFolderId}/${articleId}`);
      } else if (postType === 'team-space') {
        router.push(`/team-space/${spaceId}/${selectedFolderId}/${articleId}`);
      }
    }
  } else {
    // 생성 모드
    console.log("아카이브 게시글 생성 로직 실행", { spaceId, folderId: selectedFolderId });

    const response = await SpaceAPI.postArchiveArticleCreate(
      spaceId,
      selectedFolderId,
      articlePayload
    );

    console.log('아카이브 게시글 생성 성공:', response);
    alert(`아카이브 게시글이 성공적으로 등록되었습니다!\n게시글 ID: ${response?.articleId}`);

    // 성공 후 상세 페이지로 이동
    if (response?.articleId) {
      if (postType === 'my-space') {
        // 마이스페이스: /my-space/archive/[folderId]/[articleId]
        router.push(`/my-space/archive/${selectedFolderId}/${response.articleId}`);
      } else if (postType === 'team-space') {
        // 팀스페이스: /team-space/[spaceId]/[folderId]/[articleId]
        router.push(`/team-space/${spaceId}/${selectedFolderId}/${response.articleId}`);
      }
    }
  }
}
