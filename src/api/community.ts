// frontend/src/api/community.ts

import { apiFetch } from "@/api/fetcher";
import { CommunityBoardItemProps, CommunityFloatingItemProps, CommunityPostItemResponse } from "@/types/itemType";


/**
 * communityAPI
 * @description 커뮤니티 페이지에서 사용되는 API입니다.
 */
export const CommunityAPI = {

  /**
   * 커뮤니티 페이지 데이터 조회하는 API입니다.
   * @page /community
   * @description 커뮤니티 페이지 데이터를 조회하는 API입니다.
   * @returns {Promise<{ communityBoardList: CommunityBoardItemProps[], popularPosts: CommunityFloatingItemProps[] }>}
   */
  async getCommunityPageData() {
    const [{ communityBoardList }, { popularPosts }] = await Promise.all([
      CommunityAPI.getCommunityBoardList(),
      CommunityAPI.getPopularPosts(),
    ]);
    return {
      communityBoardList,
      popularPosts,
    };
  },

  /**
   * 커뮤니티 게시판 데이터 조회하는 API입니다.
   * @page /community
   * @endpoint /api/v1/posts?page={page}&size={size}&author={author}&title={title}&tag={tag}&sorter={sorter}&category={category}&type={type}
   * @description 커뮤니티 게시판 데이터를 조회하는 API입니다.
   * @returns {Promise<{ communityBoardList: CommunityBoardItemProps[] }>}
   */
  async getCommunityBoardList() {
    const response = await apiFetch<CommunityBoardItemProps[]>(`/mock/CommunityBoardData.json`);
    return {
      communityBoardList: response,
    };
  },

  /**
   * 인기글 데이터 조회하는 API입니다.
   * @page /community
   * @endpoint 미정
   * @description 인기글 데이터를 조회하는 API입니다.
   * @returns {Promise<{ popularPosts: CommunityFloatingItemProps[] }>}
   */
  async getPopularPosts() {
    const response = await apiFetch<CommunityFloatingItemProps[]>(`/mock/CommunityPopularPost.json`);
    return {
      popularPosts: response,
    };
  },

  /**
   * 커뮤니티 게시글 상세 데이터 조회하는 API입니다.
   * @page /community/[postId]
   * @endpoint /api/v1/posts/{postId}
   * @description 커뮤니티 게시글 상세 데이터를 조회하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ communityPostDetailData: CommunityPostItemResponse }>}
   */
  async getCommunityPostDetailData(postId: number) {
    const response = await apiFetch<CommunityPostItemResponse>(`/mock/CommunityPostDetailData.json?postId=${postId}`);
    return {
      communityPostDetailData: response,
    };
  },
};