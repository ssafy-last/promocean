import { ApiResponse } from "./common";
import { apiFetch } from "./fetcher";

export interface PostArticleRequest {
    title: string;
    description: string;
    category : number;
    prompt : string;
    promptType : number;
    sampleQuestion : string;
    sampleAnswer : string;
    tags : string[];
}


export interface PostArticleResponse{
    postId : number;
}

export const PostAPI = {

    async postArticlePost(data: PostArticleRequest) {
        const res = await apiFetch<ApiResponse<PostArticleResponse>>(`/api/v1/posts`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

}