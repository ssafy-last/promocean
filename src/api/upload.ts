import { ApiResponse } from "./common";
import { apiFetch } from "./fetcher";
import { NoArgsResponse } from "./space";


export interface getImagesS3UploadResponse{
    presignedUrl : string;
    key : string;
}


export interface uploadImageToS3Request{
    presignedUrl : string;
    file : File;
}

export const UploadAPI = {

    async getImagesS3Upload(fileName : string) : Promise<getImagesS3UploadResponse | null>{

        const res = await apiFetch<ApiResponse<getImagesS3UploadResponse>>(`/api/v1/images?filename=${encodeURIComponent(fileName)}`, {
        });
        console.log("getImagesS3Upload response:", res);
        return res.data;
    },

    async uploadImageToS3(req: uploadImageToS3Request) : Promise<Response | null>{
        console.log("Uploading file to S3:", req.file);
        console.log("로그으으으으!!!!!!!!!! ",req.file.name, req.file.type);
        const res = await fetch(req.presignedUrl, {
            method : 'PUT',
            body : req.file,
            headers: {  
                'Content-Type': req.file.type
            },
            
        })
        console.log("S3 upload response1 :", res);

        
        return res;
    } 

}