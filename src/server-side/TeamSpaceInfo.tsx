'use server'

import { cookies } from "next/headers"


export interface NextSimpleResponse{
    status: number;
    message: string;
}


export async function getTeamSpaceInfo(spaceId:number, name:string, participantCnt:number, spaceCoverUrl:string) {
  
    const newcookies = await cookies();
    
    
    newcookies.set('teamSpaceInfo', JSON.stringify({
        spaceId: spaceId,
        name: name,
        participantCnt: participantCnt,
        spaceCoverUrl: spaceCoverUrl
    }),{ path: '/', httpOnly: false });

    return {
        status: 200,
        message: "Team space info set in cookies"
    }
}

