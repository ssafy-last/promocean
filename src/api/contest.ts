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
 * @description 컨테스트 페이지에서 사용되는 API입니다.
 * @returns {Promise<{ contestPostData: ContestPostItemProps, leaderboardList: LeaderboardItemProps[], contestInfoData: ContestInfoItemProps[], contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
 */
export const ContestAPI = {

  /**
   * 대회 페이지 조회 시 필요한 데이터 조회하는 API입니다.
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

  /**
   * 대회 목록 데이터 조회하는 API입니다.
   * @page /contest?page=1&size=10&sorter=&status=&title=&tag=
   * @endpoint /api/v1/contests?page={page}&size={size}&sorter={sorter}&status={status}&title={title}&tag={tag}
   * @description 대회 목록 데이터를 조회하는 API입니다.
   * @returns {Promise<{ contestList: ContestPostItemProps[] }>}
   */
  async getContestList(page=0, size=10, sorter="", status="", title="", tag="") {
    const response = await apiFetch<ContestPostItemProps[]>(`/mock/ContestPostItem.json`);
    return {
      contestList: response,
    };
  },
  
  /**
   * 대회 상세 페이지를 조회하는 API입니다.
   * @page /contest/post/[contestId]
   * @endpoint /api/v1/contests/{contestId}
   * @description 대회 상세 페이지를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @returns {Promise<{ contestData: ContestPostItemProps }>}
   */
  async getContestData(contestId: number) {
    const response = await apiFetch<ContestInfoItemProps[]>(`/mock/ContestInfoData.json?contestId=${contestId}`);
    return {
      contestData: response,
    };
  },

  /**
   * 대회 상세 페이지 공지사항 목록 데이터 조회하는 API입니다.
   * @page /contest/post/[contestId]?tab=notice
   * @endpoint /api/v1/contests/{contestId}/notices
   * @description 대회 상세 페이지 공지사항 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @returns {Promise<{ contestNoticeList: ContestNoticeItemProps[] }>}
   */
  async getContestNoticeList(contestId: number) {
    const response = await apiFetch<ContestNoticeItemProps[]>(`/mock/ContestNoticeData.json?contestId=${contestId}`);
    return {
      contestNoticeList: response,
    };
  },
  
  /**
   * 대회 상세 페이지 공지사항 데이터 조회하는 API입니다.
   * @page /contest/post/[contestId]/notice/[noticeId]
   * @endpoint /api/v1/contests/{contestId}/notices/{noticeId}
   * @description 대회 상세 페이지 공지사항 데이터를 조회하는 API입니다.
   * @param {number} noticeId - 공지사항 ID
   * @returns {Promise<{ noticeData: ContestNoticeDetailData }>}
   */
  async getContestNoticeDetailData(noticeId: number) {
    const response = await apiFetch<ContestNoticeDetailData>(`/mock/ContestNoticeDetailData.json?noticeId=${noticeId}`);
    return {
      noticeData: response,
    };
  },

  /**
   * 대회 상세 페이지 산출물 목록 데이터 조회하는 API입니다.
   * @page /contest/post/[contestId]?tab=submission
   * @endpoint /api/v1/contests/{contestId}/submissions
   * @description 대회 상세 페이지 산출물 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @returns {Promise<{ contestSubmissionList: ContestSubmissionItemProps[] }>}
  */
  async getContestSubmissionList(contestId: number) {
    const response = await apiFetch<ContestSubmissionItemProps[]>(`/mock/ContestSubmissionData.json?contestId=${contestId}`);
    return {
      contestSubmissionList: response,
    };
  },


  /**
   * 대회 상세 페이지 산출물 데이터 조회
   * @page /contest/post/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
   * @description 대회 상세 페이지 산출물 데이터를 조회하는 API입니다.
   * @param {number} submissionId - 산출물 ID
   * @returns {Promise<{ submissionData: ContestSubmissionDetailData }>}
   */
  async getContestSubmissionDetailData(submissionId: number) {
    const response = await apiFetch<ContestSubmissionDetailData>(`/mock/ContestSubmissionDetailData.json?submissionId=${submissionId}`);
    return {
      submissionData: response,
    };
  },


};
