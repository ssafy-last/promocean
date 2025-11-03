import SearchBar from "@/components/filter/SearchBar";
import PlusCircle from "@/components/icon/PlusCircle";

// frontend/src/app/team-space/page.tsx
export default function TeamSpacePage() {


  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4 flex flex-col">
  <div className="flex flex-row justify-between items-center mb-5">
    <button className="flex flex-row gap-1 font-medium text-2xl hover:text-primary transition-colors">
      <PlusCircle/>
      팀 생성
    </button>
    <SearchBar/>
  </div>

  <div className="flex-1 px-5 grid grid-cols-4 auto-rows-max gap-x-7 gap-y-10">
    <button className="group flex flex-col h-60 rounded-2xl bg-primary hover:bg-primary/90 overflow-hidden transition-all duration-300 ease-out 
    hover:shadow-2xs
    hover:-translate-y-1 
    active:translate-y-0 
    active:shadow-md">
      {/* 이미지 영역 */}
      <image 
      className="shrink-0 h-32 flex justify-center items-center bg-accent text-white transition-all duration-300 
      group-hover:h-40">
        imageas
      </image>

      {/* 텍스트 영역 */}
      <div className="flex flex-col text-left items-start px-5 py-3 gap-1 flex-1 min-w-0 overflow-hidden">
        <div className="font-semibold text-2xl line-clamp-1 w-full wrap-break-words transition-colors group-hover:text-primary-foreground">
          제목
        </div>
        
        <div className="text-xs leading-tight line-clamp-2 w-full wrap-break-words transition-opacity 
        group-hover:opacity-0">
          텍스트텍스트텍스asdasdasdasdasdasdasdasdasdasdasdasdaasdasdasdd
        </div>
      </div>
    </button>
  </div>
</div>
  );
}
