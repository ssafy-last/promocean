
/**
 * SpaceArchiveItem의 props 타입 정의입니다.
 *
 * title : 카드의 제목입니다.
 * bgColor : 카드의 배경색입니다.
 * 
 * **참고로 배경색의 경우, tailwincss 기반이므로 bg- 색상코드 형태로 전달해주셔야 합니다.**
 * @example 색상코드 예시
 * - bg-blue-200
 * - bg-[#0949ad]
 */
export interface SpaceArchiveItemProps {
    title: string;
    bgColor : string;
}



/**
 * SpaceArchiveItem 컴포넌트
 * @param param0 SpaceArchiveItemProps 의 분해 할당
 * @returns    {React.ReactNode}
 * 
 * 마이 스페이스 및 팀 스페이스 아카이브 페이지에서 사용되는
 * 아카이브 아이템 컴포넌트입니다.

 * @example
 * <SpaceArchiveItem title="AI 챗봇" bgColor="bg-blue-200"/>
 * <SpaceArchiveItem title="이미지 생성" bgColor="bg-[#0949ad]"/>
 * 
 */
export default function SpaceArchiveItem({ title, bgColor }: SpaceArchiveItemProps) {
  return (
    <button
      className={`
        w-40 h-60 relative ${bgColor} rounded-[20px]
        shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] overflow-hidden
        transition-all duration-200 ease-in-out
        hover:-translate-y-1 hover:brightness-105 hover:shadow-lg
        active:translate-y-0 active:scale-95 active:shadow-sm
      `}
    >
      <div className="w-40 h-20 p-2.5 left-0 top-40 absolute bg-white inline-flex justify-center items-center gap-2.5">
        <div className="text-center justify-center text-black text-3xl font-medium font-['Pretendard'] leading-9">
          {title}
        </div>
      </div>
    </button>
  );
}