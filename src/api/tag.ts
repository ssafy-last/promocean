import { ApiResponse } from "@/types/apiTypes/common";
import { apiFetch } from "./fetcher";

export interface TagItem{
    tagId : number;
    tagName : string;
    usageCnt : number;
}


export interface TagAutoCompleteResponse{
    tagList : TagItem[];
}




export function getTagAutoCompleteList(params ? : {keyword ? : string, size? : number}) : Promise<TagItem[]> {

    const queryParams = new URLSearchParams();

    //size default = 10
    if (!params?.size) queryParams.append('size', '10');

    if (params?.keyword) queryParams.append('keyword', params.keyword);
    if (params?.size) queryParams.append('size', params.size.toString());

    const res = apiFetch<ApiResponse<TagAutoCompleteResponse>>(`/api/v1/tags/autocomplete?${queryParams.toString()}`, {
        method : 'GET',
    }).then((response) => response.data.tagList);


    return res;
}