// frontend/src/api/contest.ts

import { apiFetch } from "@/api/fetcher";
import {
  ContestPostItemProps,
  LeaderboardItemProps,
  ContestInfoItemProps,
  ContestNoticeItemProps,
  ContestSubmissionItemProps,
  ContestSubmissionDetailData,
  ContestNoticeDetailData,
} from "@/types/itemType";

/**
 * ContestAPI
 * @description ContestAPI is a contest API that fetches contest post page data
 * @returns {Promise<{ contestPostData: ContestPostItemProps, leaderboardList: LeaderboardItemProps[], contestInfoData: ContestInfoItemProps[], contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
 */
export const ContestAPI = {

  /**
   * 대회 상세 페이지 데이터 조회
   * @description 대회 상세 페이지 데이터를 조회하는 API입니다.
   * @returns {Promise<{ contestPostData: ContestPostItemProps, leaderboardList: LeaderboardItemProps[], contestInfoData: ContestInfoItemProps[], contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
   */
  async getContestPostPageData() {
    const [
      contestPost,
      leaderboard,
      contestInfo,
      contestNotice,
      contestSubmission,
    ] = await Promise.all([
      apiFetch<ContestPostItemProps>("/mock/ContestPostItem.json"),
      apiFetch<{ Leaderboard: LeaderboardItemProps[] }>("/mock/LeaderboardItem.json"),
      apiFetch<{ items: ContestInfoItemProps[] }>("/mock/ContestInfoItem.json"),
      apiFetch<ContestNoticeItemProps[]>("/mock/ContestNoticeData.json"),
      apiFetch<ContestSubmissionItemProps[]>("/mock/ContestSubmissionData.json"),
    ]);

    return {
      contestPostData: contestPost,
      leaderboardList: leaderboard.Leaderboard || [],
      contestInfoData: contestInfo.items || [],
      contestInfoTitles: ["대회 정보", "상금 유형", "참여 통계", "해시태그"],
      contestNoticeList: contestNotice || [],
      contestSubmissionList: contestSubmission || [],
    };
  },

  async getContestSubmissionDetailData(submissionId: number) {
    const response = await apiFetch<ContestSubmissionDetailData>(`/mock/ContestSubmissionDetailData.json?submissionId=${submissionId}`);
    return {
      submissionData: response,
    };
  },

  async getContestNoticeDetailData(noticeId: number) {
    const response = await apiFetch<ContestNoticeDetailData>(`/mock/ContestNoticeDetailData.json?noticeId=${noticeId}`);
    return {
      noticeData: response,
    };
  },
};
