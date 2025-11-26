// frontend/src/utils/articleLoader.ts

import { ContestAPI } from "@/api/contest/contest";
import { SubmissionAPI } from "@/api/contest/submission";
import { PostAPI as CommunityPostAPI } from "@/api/community/post";
import SpaceAPI from "@/api/space";
import { textToLexicalJSON } from "./lexicalConverter";
import { mapPromptType, mapCategoryFromApi } from "./typeMapper";
import { extractS3KeyFromUrl, s3KeyToCloudFrontUrl } from "./imageUtils";

/**
 * 산출물 데이터 로드 및 폼 상태 설정
 */
export async function loadSubmissionData(
  contestId: number,
  submissionId: number,
  setters: {
    setSelectedPromptType: (type: string) => void;
    setContestType: (type: any) => void;
    setDescriptionState: (state: string) => void;
    setUsedPrompt: (prompt: string) => void;
    setAnswerPrompt: (answer: string) => void;
    setUploadedImageUrl: (url: string) => void;
    setUploadedImageKey: (key: string) => void;
    setGeneratedImageUrl: (url: string) => void;
    setGeneratedImageKey: (key: string) => void;
  }
) {
  // 내 산출물 수정은 조회 기간과 관계없이 항상 가능해야 하므로 getMySubmission 사용
  const { contestMySubmissionItem: submissionData } = await SubmissionAPI.getMySubmission(contestId);

  if (!submissionData) {
    throw new Error('산출물을 찾을 수 없습니다.');
  }

  // submissionId가 일치하는지 확인 (보안을 위해)
  if (submissionData.submissionId !== submissionId) {
    throw new Error('본인의 산출물만 수정할 수 있습니다.');
  }

  // 대회 정보도 가져와서 타입 설정
  const { contestData } = await ContestAPI.getDetail(contestId);
  console.log('수정 모드 - 대회 정보 로드:', contestData.type, '전체 데이터:', contestData);

  const mappedType = mapPromptType(contestData.type);
  console.log('수정 모드 - 설정할 프롬프트 타입:', mappedType, '원본 타입:', contestData.type, '타입 체크:', typeof contestData.type);
  setters.setSelectedPromptType(mappedType);
  setters.setContestType(contestData.type);

  // 폼 데이터 채우기
  setters.setDescriptionState(textToLexicalJSON(submissionData.description));
  setters.setUsedPrompt(textToLexicalJSON(submissionData.prompt));

  // 결과 설정 (타입에 따라 다르게)
  const submissionType = mapPromptType(submissionData.type);
  if (submissionType === 'image' && submissionData.result) {
    // 이미지 타입인 경우
    const resultValue = submissionData.result;
    console.log('수정 모드 - 이미지 결과:', resultValue);

    // CloudFront URL인지 S3 key인지 확인
    let imageUrl: string;
    let s3Key: string;

    if (resultValue.startsWith('http://') || resultValue.startsWith('https://')) {
      // CloudFront URL인 경우
      imageUrl = resultValue;
      s3Key = extractS3KeyFromUrl(resultValue);
    } else {
      // S3 key인 경우
      s3Key = resultValue;
      imageUrl = s3KeyToCloudFrontUrl(resultValue);
    }

    console.log('수정 모드 - 이미지 설정:', { imageUrl, s3Key });

    setters.setAnswerPrompt('');
    setters.setUploadedImageUrl(imageUrl); // 렌더링용: 전체 URL
    setters.setUploadedImageKey(s3Key); // 전송용: S3 key만
    setters.setGeneratedImageUrl(imageUrl);
    setters.setGeneratedImageKey(s3Key);
  } else {
    // 텍스트 타입인 경우
    setters.setAnswerPrompt(textToLexicalJSON(submissionData.result));
  }
}

/**
 * 커뮤니티 게시글 데이터 로드 및 폼 상태 설정
 */
export async function loadCommunityPostData(
  postId: number,
  setters: {
    setSelectedPromptType: (type: string) => void;
    setSelectedCategory: (category: string) => void;
    setTitle: (title: string) => void;
    setTags: (tags: string[]) => void;
    setDescriptionState: (state: string) => void;
    setUsedPrompt: (prompt: string) => void;
    setExamplePrompt: (prompt: string) => void;
    setAnswerPrompt: (answer: string) => void;
    setUploadedImageUrl: (url: string) => void;
    setUploadedImageKey: (key: string) => void;
  }
) {
  const { communityPostDetailData } = await CommunityPostAPI.getDetail(postId);

  if (!communityPostDetailData) {
    throw new Error('게시글을 찾을 수 없습니다.');
  }

  // 타입 변환
  console.log('커뮤니티 원본 타입:', communityPostDetailData.type, '타입:', typeof communityPostDetailData.type);
  let mappedType = mapPromptType(communityPostDetailData.type);

  // fileUrl이 있으면 이미지 타입으로 설정
  if (communityPostDetailData.fileUrl) {
    mappedType = "image";
  }
  console.log('커뮤니티 매핑된 타입:', mappedType);

  // 카테고리 변환 (API 코드 -> 표시 이름)
  const mappedCategory = mapCategoryFromApi(communityPostDetailData.category);

  // 프롬프트 타입과 카테고리 먼저 설정
  setters.setSelectedPromptType(mappedType);
  setters.setSelectedCategory(mappedCategory);

  // 폼 데이터 채우기
  setters.setTitle(communityPostDetailData.title);
  setters.setTags(communityPostDetailData.tags);
  setters.setDescriptionState(textToLexicalJSON(communityPostDetailData.description));
  setters.setUsedPrompt(textToLexicalJSON(communityPostDetailData.prompt));
  setters.setExamplePrompt(textToLexicalJSON(communityPostDetailData.sampleQuestion));
  setters.setAnswerPrompt(textToLexicalJSON(communityPostDetailData.sampleAnswer || ''));

  // fileUrl이 있으면 이미지 설정
  if (communityPostDetailData.fileUrl) {
    const imageUrl = communityPostDetailData.fileUrl;
    const s3Key = extractS3KeyFromUrl(imageUrl);
    setters.setUploadedImageUrl(imageUrl); // 렌더링용: 전체 URL
    setters.setUploadedImageKey(s3Key); // 전송용: S3 key만
  }
}

/**
 * 아카이브 게시글 데이터 로드 및 폼 상태 설정
 */
export async function loadArchiveArticleData(
  spaceId: number,
  articleId: number,
  setters: {
    setSelectedPromptType: (type: string) => void;
    setTitle: (title: string) => void;
    setTags: (tags: string[]) => void;
    setDescriptionState: (state: string) => void;
    setUsedPrompt: (prompt: string) => void;
    setExamplePrompt: (prompt: string) => void;
    setAnswerPrompt: (answer: string) => void;
    setUploadedImageUrl: (url: string) => void;
    setUploadedImageKey: (key: string) => void;
  }
) {
  const data = await SpaceAPI.getArchiveArticleDetail(spaceId, articleId);

  if (!data) {
    throw new Error('게시글을 찾을 수 없습니다.');
  }

  // 타입 변환
  console.log('아카이브 원본 타입:', data.type, '타입:', typeof data.type);
  const mappedType = mapPromptType(data.type);
  console.log('매핑된 타입:', mappedType);

  // 프롬프트 타입 먼저 설정
  setters.setSelectedPromptType(mappedType);

  // 폼 데이터 채우기
  setters.setTitle(data.title);
  setters.setTags(data.tags);
  setters.setDescriptionState(textToLexicalJSON(data.description));
  setters.setUsedPrompt(textToLexicalJSON(data.prompt));
  setters.setExamplePrompt(textToLexicalJSON(data.sampleQuestion));
  setters.setAnswerPrompt(textToLexicalJSON(data.sampleAnswer || ''));

  // 이미지 타입인 경우 fileUrl 설정
  if (mappedType === 'image' && data.fileUrl) {
    const imageUrl = data.fileUrl;
    const s3Key = extractS3KeyFromUrl(imageUrl);
    setters.setUploadedImageUrl(imageUrl); // 렌더링용: 전체 URL
    setters.setUploadedImageKey(s3Key); // 전송용: S3 key만
  }
}
