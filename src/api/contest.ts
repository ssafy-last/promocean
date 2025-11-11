// frontend/src/api/contest.ts

import { apiFetch } from "@/api/fetcher";
import {
  ContestCardItemProps,
  LeaderboardItemProps,
  ContestInfoItemProps,
  ContestPostItemProps,
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
   * @page /contest/[postId]
   * @description 대회 상세 페이지 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (postId)
   * @returns {Promise<{ contestPostData: ContestPostItemProps, leaderboardList: LeaderboardItemProps[], contestInfoData: ContestInfoItemProps[], contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
   */
  async getContestPostPageData(contestId: number) {
    const [
      { contestData: contestPostData },
      { leaderboardList },
      { contestInfoData },
      { contestNoticeList },
      { contestSubmissionList },
    ] = await Promise.all([

      ContestAPI.getContestDetailData(contestId),
      ContestAPI.getContestLeaderboardList(contestId),
      ContestAPI.getContestInfoData(contestId),
      ContestAPI.getContestNoticeList(contestId),
      ContestAPI.getContestSubmissionList(contestId),
    ]);

    return {
      contestPostData,
      leaderboardList: leaderboardList || [],
      contestInfoData: contestInfoData || [],
      contestInfoTitles: ["대회 정보", "상금 유형", "참여 통계", "해시태그"],
      contestNoticeList: contestNoticeList || [],
      contestSubmissionList: contestSubmissionList || [],
    };
  },

  /**
   * 대회 목록 데이터 조회하는 API입니다.
   * @page /contest?page=1&size=10&sorter=&status=&title=&tag=
   * @endpoint /api/v1/contests?page={page}&size={size}&sorter={sorter}&status={status}&title={title}&tag={tag}
   * @description 대회 목록 데이터를 조회하는 API입니다.
   * @returns {Promise<{ contestCardList: ContestCardItemProps[] }>}
   */
  async getContestCardList(page=0, size=10, sorter="", status="", title="", tag="") {
    
    // interface ApiResponse {
    //   message: string | null;
    //   data: ContestCardItemProps[];
    // }
    // const response = await apiFetch<ApiResponse>(`/api/v1/contests?page=${page}&size=${size}&sorter=${sorter}&status=${status}&title=${title}&tag=${tag}`);
    const response = await fetch(`http://localhost:3000/mock/ContestCardList.json`, {
      cache: "no-store", // mock 데이터는 캐싱하지 않게
    }).then(res => res.json());
    return {
      contestCardList: response.data,
    };
  },

  /**
   * 대회 추가 요약 정보를 데이터 조회하는 API입니다.
   * @page /contest/[postId]
   * @endpoint 목 데이터 사용중입니다. TODO : 삭제 예정?
   * @description 대회 정보를 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (postId)
   * @returns {Promise<{ contestInfoData: ContestInfoItemProps[] }>}
   */
  async getContestInfoData(contestId: number) {
    const response = await apiFetch<ContestInfoItemProps[]>(`/mock/ContestInfoItem.json?contestId=${contestId}`);
    return {
      contestInfoData: response,
    };
  },
  
  /**
   * 대회 상세 페이지를 조회하는 API입니다.
   * @page /contest/[contestId
   * @endpoint /api/v1/contests/{contestId}
   * @description 대회 상세 페이지를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ contestData: ContestPostItemProps }>}
   */
  async getContestDetailData(contestId: number) {
    const response = await apiFetch<ContestPostItemProps>(`/mock/ContestPostDetail.json?contestId=${contestId}`);
    return {
      contestData: response,
    };
  },

  /**
   * 대회 상세 페이지 리더보드 목록 데이터 조회하는 API입니다.
   * @page /contest/[contestId]?tab=leaderboard
   * @endpoint 목 데이터 사용중입니다. TODO : 삭제 예정?
   * @description 대회 상세 페이지 리더보드 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ leaderboardList: LeaderboardItemProps[] }>}
   */
  async getContestLeaderboardList(contestId: number) {
    const response = await apiFetch<LeaderboardItemProps[]>(`/mock/ContestLeaderboardItem.json?contestId=${contestId}`);
    return {
      leaderboardList: response,
    };
  },

  /**
   * 대회 상세 페이지 공지사항 목록 데이터 조회하는 API입니다.
   * @page /contest/[contestId]?tab=notice
   * @endpoint /api/v1/contests/{contestId}/notices
   * @description 대회 상세 페이지 공지사항 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
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
   * @page /contest/[contestId]/notice/[noticeId]
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
   * @page /contest/[contestId]?tab=submission
   * @endpoint /api/v1/contests/{contestId}/submissions
   * @description 대회 상세 페이지 산출물 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
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
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
   * @description 대회 상세 페이지 산출물 데이터를 조회하는 API입니다.
   * @param {number} submissionId - 산출물 ID
   * @returns {Promise<{ submissionData: ContestSubmissionDetailData }>}
   */
  async getContestSubmissionDetailData(submissionId: number) {
    // const response = await apiFetch<ContestSubmissionDetailData>(`/mock/ContestSubmissionDetailData.json?submissionId=${submissionId}`);
    const response = await fetch(`/mock/ContestSubmissionDetailData.json`);
    return {
      submissionData: response,
    };
  },

  /**
   * 대회 산출물 투표
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}/votes
   * @description 대회 산출물 투표하는 API입니다.
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async createContestSubmissionVote(contestId: number, submissionId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/submissions/${submissionId}/votes`, {
      method: 'POST',
    });

    return {
      message: response.message,
      data: response.data,
    }
  },
};
