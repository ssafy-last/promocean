import { MySpaceArchiveDataResponse } from "@/app/my-space/page";
import { apiFetch } from "./fetcher";


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


export const SpaceAPI = {

    /**
     * 마이스페이스의 아카이브 폴더 데이터를 조회하는 API입니다.
     */
    async getMySpaceArchiveFoldersData(personalSpaceId : number | undefined): Promise<MySpaceArchiveDataResponse | null> {
        if(!personalSpaceId){ return null;}
        
        console.log("API personalSpaceId ", personalSpaceId);
        const res = await apiFetch<MySpaceArchiveDataResponse>(`/api/v1/spaces/${personalSpaceId}/folders`, {
            method: "GET",
        });

        console.log("API Res ",res.data.folders);
        return res.data.folders;
    },


    async postMySpaceArchiveFolderData(personalSpaceId : number | undefined, folderData : PostMySpaceArchiveFolderRequest): 
    Promise<PostMySpaceArchiveFolderResponse | null> {
        if(!personalSpaceId){
            return null;
        }

        const res = await apiFetch<PostMySpaceArchiveFolderResponse>(`/api/v1/spaces/${personalSpaceId}/folders`, {
            method: "POST",
            body: JSON.stringify(folderData),
        });

        console.log("API Res ",res);
        return res;
    }
    
//         //TODO : 백엔드 API 연결 후 수정 필요
// const mySpaceArchiveRes = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/mock/MySpaceArchiveData.json`,
//     { cache: "no-store" }
// );

// const mySpaceData = await mySpaceArchiveRes.json() as MySpaceArchiveDataResponse;
// console.log("data ", mySpaceData);


}

export default SpaceAPI;