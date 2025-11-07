
export interface TeamSpaceInsertionModalTabsProps {
    modalTabState: "권한" | "초대";
    setModalTabState: (tab: "권한" | "초대") => void;

}



export default function TeamSpaceInsertionModalTabs({modalTabState, setModalTabState}: TeamSpaceInsertionModalTabsProps){

return(
              <div className = "flex flex-col relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-300 "> 
                  <div className = "flex flex-row gap-2 [&>button:hover]:bg-gray-200 [&>button]:rounded-md">
                    <button className = {` ${modalTabState === "권한" ? "text-primary" : "text-gray-500"} p-2`}
                      onClick={() => setModalTabState("권한")}
                    > 권한 </button>
                    <button className = {` ${modalTabState === "초대" ? "text-primary" : "text-gray-500"} p-2`}
                      onClick={() => setModalTabState("초대")}
                    > 초대 </button>
                  </div>
                  <span className={`absolute w-10 h-1 bg-primary bottom-0 
                  ${modalTabState === "권한" ? "left-0.5" : "left-13.5"} transition-all duration-300 ease-in-out`}> </span>
                </div>  
            )

}