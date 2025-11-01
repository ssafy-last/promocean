// frontend/src/app/my-space/archive/[folder]/page.tsx


export interface MySpaceArchiveFolderPageProps {
  params : { folder : string }

}


export default function MySpaceArchiveFolderPage({ params }: MySpaceArchiveFolderPageProps) {
  const folderName = decodeURIComponent(params.folder);
  // decodeURIComponent : URL에 인코딩된 문자열을 원래 문자열로 디코딩하는 함수
  // 예를 들어, "AI%20챗봇"이라는 제목은 "AI 챗봇"으로 디코딩됩니다. 
  // encodeURIComponent를 쓴 문자열에 대해선 꼭 해줘야하ㅣㅁ

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{folderName}</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">마이 스페이스 아카이브 폴더 페이지</p>
        </div>
      </div>
    </div>
  );
}
