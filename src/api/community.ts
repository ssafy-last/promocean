// frontend/src/api/community.ts

import { apiFetch } from "@/api/fetcher";
import { CommunityBoardItemProps, CommunityBoardItemResponse, CommunityFloatingItemProps, CommunityPostItemResponse } from "@/types/itemType";


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
  async getCommunityBoardList(params?: {
    page?: number;
    size?: number;
    author?: string;
    title?: string;
    tag?: string;
    sorter?: string;
    category?: string;
    type?: string;
  }) {
    // 쿼리 파라미터 생성
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.size) queryParams.set('size', params.size.toString());
    if (params?.author) queryParams.set('author', params.author);
    if (params?.title) queryParams.set('title', params.title);
    if (params?.tag) queryParams.set('tag', params.tag);
    if (params?.sorter) queryParams.set('sorter', params.sorter);
    if (params?.category) queryParams.set('category', params.category);
    if (params?.type) queryParams.set('type', params.type);

    if (queryParams.toString() === '') {
      queryParams.set('page', '1');
      queryParams.set('size', '10');
    }

    interface ApiResponse {
      message: string | null;
      data: {
        posts: CommunityBoardItemResponse[];
      };
    }

    // const response = await apiFetch<ApiResponse>(`/api/v1/posts?${queryParams.toString()}`);
    const response = await apiFetch<ApiResponse>(`/mock/CommunityBoardListResponse.json`);

    const communityBoardList: CommunityBoardItemProps[] = response.data.posts.map((post) => ({
      postId: post.postId,
      author: post.author,
      profileUrl: post.profileUrl,
      title: post.title,
      type: post.type,
      description: post.description,
      category: post.category,
      tags: post.tags,
      likeCnt: post.likeCnt,
      replyCnt: post.replyCnt,
      image: undefined, // API 응답에 image 필드가 없음
    }));

    return {
      communityBoardList,
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
    // API 응답 타입: { message: string | null, data: CommunityPostItemResponse }
    interface ApiResponse {
      message: string | null;
      data: CommunityPostItemResponse;
    }
    
    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}`);
    
    // API 응답에서 data 추출
    const communityPostDetailData = response.data;
    
    return {
      communityPostDetailData,
    };
  },
};