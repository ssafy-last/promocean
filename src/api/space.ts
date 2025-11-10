import {  SpaceArchiveData } from "@/app/my-space/page";
import { apiFetch } from "./fetcher";
import { ApiResponse } from "./common";

export interface NoArgsResponse{
    message : string;
}


export interface GetMySpaceArchiveFoldersResponse{
     folders : SpaceArchiveData[];
}

export interface PostMySpaceArchiveFolderRequest {
    name :string;
    color:string;
}

export interface PostMySpaceArchiveFolderResponse {
    folderId : number;
    name :string;
    color:string;
    isPinned : boolean;
}

export interface PatchMySpaceArchiveFolderDataRequest {
    name : string;
    color : string;
}

export interface PatchMySpaceArchiveFolderPinStatusRequest {
    folderId : number;
    name : string;
    color : string;
    isPinned : boolean;
}

export const SpaceAPI = {

    /**
     * 마이스페이스의 아카이브 폴더 데이터를 조회하는 API입니다.
     */
    async getMySpaceArchiveFoldersData(personalSpaceId : number | undefined) : Promise<GetMySpaceArchiveFoldersResponse | null> {
        if(!personalSpaceId){ return null;}
        
        console.log("API personalSpaceId ", personalSpaceId);
        const res = await apiFetch <ApiResponse<GetMySpaceArchiveFoldersResponse>>(`/api/v1/spaces/${personalSpaceId}/folders`, {
            method: "GET",
        });

        return res.data;
    },


    /*
    * 마이스페이스의 아카이브 폴더를 추가하는 API입니다.
    */
    async postMySpaceArchiveFolderData(personalSpaceId : number | undefined, folderData : PostMySpaceArchiveFolderRequest): 
    Promise<PostMySpaceArchiveFolderResponse | null> {
        if(!personalSpaceId){
            return null;
        }
        console.log("폴더 데이터!! ", folderData)
        const res = await apiFetch<PostMySpaceArchiveFolderResponse>(`/api/v1/spaces/${personalSpaceId}/folders`, {
            method: "POST",
            body: JSON.stringify(folderData),
        });

        console.log("API Res ",res);
        return res;
    },


    /*
    * 마이스페이스의 아카이브 폴더를 삭제하는 API입니다.
    */
    async deleteMySpaceArchiveFolderData(personalSpaceId : number , folderId : number) : Promise<NoArgsResponse | null> {
        if(!personalSpaceId || !folderId) {
            return null;
        }

        const res = await apiFetch<NoArgsResponse>(`/api/v1/spaces/${personalSpaceId}/folders/${folderId}`, {
            method: "DELETE",
        });

        console.log("Delete API Res ",res);

        return res;
    },

    async patchMySpaceArchiveFolderData (personalSpaceId : number, folderId : number, folderData : PatchMySpaceArchiveFolderDataRequest) : Promise<NoArgsResponse | null> {
        if(!personalSpaceId || !folderId) {
            return null;
        }

        const res = await apiFetch<NoArgsResponse>(`/api/v1/spaces/${personalSpaceId}/folders/${folderId}`, {
            method: "PATCH",
            body: JSON.stringify(folderData),
        });

        console.log("Patch API Res ",res);

        return res;
    },

    async patchMySpaceArchiveFolderPinStatus (personalSpaceId : number, folderId : number) : Promise<PatchMySpaceArchiveFolderPinStatusRequest | null> {
        if(!personalSpaceId || !folderId) {
            return null;
        }

        const res = await apiFetch<ApiResponse<PatchMySpaceArchiveFolderPinStatusRequest>>(`/api/v1/spaces/${personalSpaceId}/folders/${folderId}/pin`, {
            method: "PATCH"
        });

        console.log("Patch API Res ",res);

        return res.data;
    }

}

export default SpaceAPI;