// frontend/src/api/community/post.ts

import { apiFetch } from "@/api/fetcher";
import {
  CommunityBoardItemProps,
  CommunityBoardItemResponse,
  CommunityFloatingItemProps,
  CommunityPostItemResponse,
} from "@/types/itemType";
import { convertCategoryToApiCode } from "@/utils/categoryConvert";

/**
 * PostAPI
 * @description 커뮤니티 게시글 관련 API입니다.
 */
export class PostAPI {
  /**
   * 커뮤니티 페이지 데이터 조회하는 API입니다.
   * @page /community
   * @description 커뮤니티 페이지 데이터를 조회하는 API입니다.
   * @returns {Promise<{ communityBoardList: CommunityBoardItemProps[], popularPosts: CommunityFloatingItemProps[] }>}
   */
  static async getPageData() {
    const [{ communityBoardList }, { popularPosts }] = await Promise.all([
      PostAPI.getList(),
      PostAPI.getPopular(),
    ]);
    return {
      communityBoardList,
      popularPosts,
    };
  }

  /**
   * 커뮤니티 게시판 목록 조회하는 API입니다.
   * @page /community
   * @endpoint /api/v1/posts?page={page}&size={size}&author={author}&title={title}&tag={tag}&sorter={sorter}&category={category}&type={type}
   * @description 커뮤니티 게시판 데이터를 조회하는 API입니다.
   * @param {object} params - 쿼리 파라미터
   * @returns {Promise<{ communityBoardList: CommunityBoardItemProps[], itemCnt: number, totalCnt: number, totalPages: number, currentPage: number }>}
   */
  static async getList(params?: {
    page?: number;
    size?: number;
    author?: string;
    title?: string;
    tag?: string;
    sorter?: string;
    category?: string;
    type?: string;
  }) {
    // 쿼리 파라미터 생성 (값이 있는 파라미터만 추가)
    const queryParams = new URLSearchParams();
    
    // 디폴트값 설정
    const defaultParams = {
      page: params?.page || 1,
      size: 10, // 응답이 10개보다 적더라도 항상 10으로 요청
    };
    
    // 디폴트값 추가
    queryParams.set('page', defaultParams.page.toString());
    queryParams.set('size', defaultParams.size.toString());
    
    // 나머지 파라미터는 값이 있을 때만 추가
    if (params?.author) queryParams.set('author', params.author);
    if (params?.title) queryParams.set('title', params.title);
    if (params?.tag) queryParams.set('tag', params.tag);
    if (params?.sorter) queryParams.set('sorter', params.sorter);
    
    // 카테고리 변환 후 추가
    const convertedCategory = convertCategoryToApiCode(params?.category);
    if (convertedCategory) {
      queryParams.set('category', convertedCategory);
    }
    
    interface ApiResponse {
      message: string | null;
      data: {
        posts: CommunityBoardItemResponse[];
        itemCnt: number;
        totalCnt: number;
        totalPages: number;
        currentPage: number;
      };
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/posts?${queryParams.toString()}`);

    const { posts, itemCnt, totalCnt, totalPages, currentPage } = response.data;
    const communityBoardList: CommunityBoardItemProps[] = posts.map((post) => ({ ...post, fileUrl: undefined }));

    return {
      communityBoardList,
      itemCnt,
      totalCnt,
      totalPages,
      currentPage,
    };
  }

  /**
   * 인기글 데이터 조회하는 API입니다.
   * @page /community
   * @endpoint 미정
   * @description 인기글 데이터를 조회하는 API입니다.
   * @returns {Promise<{ popularPosts: CommunityFloatingItemProps[] }>}
   */
  static async getPopular() {
    const response = await apiFetch<CommunityFloatingItemProps[]>(`/mock/CommunityPopularPost.json`);
    return {
      popularPosts: response,
    };
  }

  /**
   * 커뮤니티 게시글 상세 데이터 조회하는 API입니다.
   * @page /community/[postId]
   * @endpoint /api/v1/posts/{postId}
   * @description 커뮤니티 게시글 상세 데이터를 조회하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ communityPostDetailData: CommunityPostItemResponse }>}
   */
  static async getDetail(postId: number) {
    interface ApiResponse {
      message: string | null;
      data: CommunityPostItemResponse;
    }
    
    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}`);
    
    const communityPostDetailData = response.data;
    
    return {
      communityPostDetailData,
    };
  }
}

