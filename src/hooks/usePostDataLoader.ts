// frontend/src/hooks/usePostDataLoader.ts

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadSubmissionData, loadCommunityPostData, loadArchiveArticleData } from '@/utils/articleLoader';
import { ContestAPI } from '@/api/contest/contest';
import { mapPromptType } from '@/utils/typeMapper';
import { useSpaceStore } from '@/store/spaceStore';
import { useAuthStore } from '@/store/authStore';

export interface DataLoaderParams {
  // 모드 및 타입
  isEditMode: boolean;
  isSubmissionType: boolean;
  postType: string | null;

  // URL 파라미터
  contestIdParam: string | null;
  submissionIdParam: string | null;
  postIdParam: string | null;
  articleIdParam: string | null;
  spaceIdParam: string | null;

  // Setters
  setIsLoadingArticle: (loading: boolean) => void;
  setIsLoadingContest: (loading: boolean) => void;
  setSelectedPromptType: (type: string) => void;
  setContestType: (type: string) => void;
  setDescriptionState: (state: string) => void;
  setUsedPrompt: (prompt: string) => void;
  setAnswerPrompt: (answer: string) => void;
  setUploadedImageUrl: (url: string) => void;
  setUploadedImageKey: (key: string) => void;
  setGeneratedImageUrl: (url: string) => void;
  setGeneratedImageKey: (key: string) => void;
  setSelectedCategory: (category: string) => void;
  setTitle: (title: string) => void;
  setTags: (tags: string[]) => void;
  setExamplePrompt: (prompt: string) => void;
}

/**
 * 게시글 데이터 로딩을 담당하는 커스텀 훅
 * - 대회 정보 로드
 * - 수정 모드 데이터 로드
 */
export function usePostDataLoader(params: DataLoaderParams) {
  const router = useRouter();
  const spaceStore = useSpaceStore();

  const {
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
  } = params;

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
        console.log('대회 정보 로드:', contestData.type);

        const mappedType = mapPromptType(contestData.type);
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

  // 수정 모드일 때 기존 게시글 데이터 로드
  useEffect(() => {
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

        // 커뮤니티 게시글 수정 모드
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
          let spaceId: number;
          if (postType === 'my-space') {
            const { user } = useAuthStore.getState();
            if (!user?.personalSpaceId) {
              alert('내 스페이스 정보를 찾을 수 없습니다.');
              router.back();
              return;
            }
            spaceId = user.personalSpaceId;
          } else if (postType === 'team-space' && spaceIdParam) {
            spaceId = parseInt(spaceIdParam, 10);
            if (isNaN(spaceId)) {
              alert('잘못된 스페이스 ID입니다.');
              router.back();
              return;
            }
          } else if (spaceStore.currentSpace?.spaceId) {
            spaceId = spaceStore.currentSpace.spaceId;
          } else {
            alert('스페이스 정보를 찾을 수 없습니다.');
            router.back();
            return;
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
    spaceIdParam,
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
}
