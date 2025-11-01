"use client";

import { useRouter } from "next/navigation";

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

    const router = useRouter();

    const click = () => {
        console.log(`${title} 아카이브 아이템 클릭됨`);

        //아니 NEXT.JS 라우팅 편하네 react-native expo랑 라우팅 방식이 동일함
        router.push('/my-space/archive/' + encodeURIComponent(title));
        
        //encodeURIComponent : 특수문자나 공백이 포함된 문자열을 URL에 안전하게 포함시키기 위해 인코딩하는 함수
        // 예를 들어, "AI 챗봇"이라는 제목은 "AI%20챗봇"으로 인코딩됩니다.
    }

  return (
    <button
      className={`
        w-40 h-60 relative ${bgColor} rounded-[10px]
        shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] overflow-hidden
        transition-all duration-200 ease-in-out
        hover:-translate-y-1 hover:brightness-105 hover:shadow-lg
        active:translate-y-0 active:scale-95 active:shadow-sm
      `}
      onClick={click}
    >
      <div className="w-full h-20 p-2.5 left-0 top-40 absolute bg-white inline-flex justify-center items-center">
        <div className="text-center justify-center text-(--text-color) text-2xl font-medium leading-9">
          {title}
        </div>
      </div>
    </button>
  );
}