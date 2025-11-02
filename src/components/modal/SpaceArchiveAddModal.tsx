import { useEffect, useState } from "react"


export interface SpaceArchiveAddModalProps{
    isOpen : boolean,
    onCloseAddModal : () => void

}

export default function SpaceArchiveAddModal({ isOpen, onCloseAddModal }: SpaceArchiveAddModalProps) {
    return (
        <div
            className={`fixed flex inset-0 z-10 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
                transition-opacity duration-300 ease-out
                ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={onCloseAddModal}
        >
            <div
                className={`flex flex-col bg-background w-[540px] h-[650px] rounded-2xl p-10 gap-5 shadow-xl
                    transition-all duration-300 ease-out
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-[2.5rem] font-semibold">카테고리 추가</h1>

                {/* 배경색 영역 */}
                <div className="flex flex-row w-full h-[146px] p-2.5 bg-white justify-between rounded-xl shadow-inner">
                    <div className="flex w-[304px] bg-blue-300 rounded-lg justify-center items-center text-2xl font-medium">
                        배경색
                    </div>

                    <div className="flex flex-col w-[136px] px-2 py-2.5 justify-center gap-y-2.5">
                        {/* 사진 버튼 */}
                        <button
                            className="flex flex-row w-full px-3 py-2.5 rounded-4xl border-2 border-primary gap-1 
                              transition-all duration-200 hover:bg-primary/10 active:scale-95 active:brightness-95"
                        >
                            <div className="w-8 h-8 bg-primary rounded-lg"></div>
                            <div className="flex flex-1 text-[0.75rem] font-semibold justify-center items-center">
                                사진
                            </div>
                        </button>

                        {/* 컬러 팔레트 버튼 */}
                        <button
                            className="flex flex-row w-full px-3 py-2.5 rounded-4xl border-2 border-primary gap-1 
                              transition-all duration-200 hover:bg-primary-content/10 active:scale-95 active:brightness-95"
                        >
                            <div className="w-8 h-8 bg-primary-content rounded-lg"></div>
                            <div className="flex flex-1 text-[0.75rem] font-semibold justify-center items-center">
                                컬러 팔레트
                            </div>
                        </button>
                    </div>
                </div>

                {/* 입력창 */}
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="flex w-full h-12 shadow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />

                <textarea
                    placeholder="카테고리 설명을 적어주세요"
                    className="flex w-full h-full shadow p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />

                {/* 하단 버튼 영역 */}
                <div className="flex flex-row py-2 justify-center gap-8">
                    {/* 취소 버튼 */}
                    <button
                        className="flex px-5 py-3 bg-gray-300 w-40 justify-center rounded-4xl 
                            hover:bg-gray-400 active:scale-95 transition-all duration-150"
                        onClick={onCloseAddModal}
                    >
                        취소
                    </button>

                    {/* 제출 버튼 */}
                    <input
                        type="submit"
                        value="추가"
                        className="flex px-5 py-3 bg-primary text-background w-40 justify-center rounded-4xl
                            cursor-pointer transition-all duration-150 hover:bg-primary/80 active:scale-95"
                    />
                </div>
            </div>
        </div>
    );
}
