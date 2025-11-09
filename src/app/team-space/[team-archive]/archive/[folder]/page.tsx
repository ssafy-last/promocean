// frontend/src/app/team-space/[team-archive]/archive/[folder]/page.tsx

import { SpaceArchiveBoardItemProps } from "@/components/item/SpaceArchiveBoardItem";
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";


export interface TeamSpaceArchiveFolderPageProps {
  params: {
    "team-archive": string;
    folder: string;
  }
}


export default async function TeamSpaceArchiveFolderPage({ params }: TeamSpaceArchiveFolderPageProps) {
  const teamName = decodeURIComponent(params["team-archive"]);
  const folderName = decodeURIComponent(params.folder);
  // decodeURIComponent : URL에 인코딩된 문자열을 원래 문자열로 디코딩하는 함수
  // 예를 들어, "AI%20챗봇"이라는 제목은 "AI 챗봇"으로 디코딩됩니다.
  // encodeURIComponent를 쓴 문자열에 대해선 꼭 해줘야 함.

  const teamSpaceBoardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardData.json`,
    { cache: "no-store" }
  );
  const teamSpaceBoardList: SpaceArchiveBoardItemProps[] = await teamSpaceBoardRes.json();

  return (

    <div className="min-h-screen bg-gray-50">

      <SpaceBoardHeader
        titleName={folderName}
        description={`${teamName} 팀의 ${folderName} 아카이브 글을 확인하세요`}
      />

      <MySpaceArchiveFilterSection buttonMode="write"/>

      <SpaceArchiveBoardList
        mySpaceBoardList={teamSpaceBoardList}
      />

    </div>

  );
}
