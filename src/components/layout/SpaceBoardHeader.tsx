'use client';

import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSpaceStore } from "@/store/spaceStore";

export interface SpaceBoardHeaderProps {
    title? : string;
    description? : string
}



export function SpaceBoardHeader(   { title, description } : SpaceBoardHeaderProps ) {

    const router = useRouter();
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const folderStore = useArchiveFolderStore();
    const spaceStore = useSpaceStore();
    const currentStore = folderStore.currentFolder;
    const currentSpace = spaceStore.currentSpace;
    const allFolders = folderStore.allFolderList;
    const titleName = currentStore ? currentStore.name : "";

    const handleFolderChange = (folderId: number) => {
        const selectedFolder = allFolders.find(folder => folder.folderId === folderId);
        if (selectedFolder) {
            folderStore.setCurrentFolder(selectedFolder);

            // 현재 경로가 팀 스페이스인지 마이 스페이스인지 확인
            const isTeamSpace = pathname?.startsWith('/team-space');

            if (isTeamSpace && currentSpace) {
                // 팀 스페이스: /team-space/[spaceId]/[folderId]
                router.push(`/team-space/${currentSpace.spaceId}/${folderId}`);
            } else {
                // 마이 스페이스: /my-space/archive/[folderId]
                router.push(`/my-space/archive/${folderId}`);
            }
        }
        setIsDropdownOpen(false);
    };

    // 현재 폴더를 제외한 다른 폴더들만 표시
    const otherFolders = allFolders.filter(folder => folder.folderId !== currentStore?.folderId);

    return(
        <div className="flex items-start justify-between w-full px-4 py-3">
            <div className="flex flex-col justify-start text-[40px] font-bold text-gray-900">
                <h1 className="text-[40px] font-bold text-gray-900">{title ? title : titleName}</h1>
                {description && <span className="text-sm font-normal">{description}</span>}
            </div>

            {/* 폴더 이동 드롭다운 */}
            {currentStore && otherFolders.length > 0 && (
                <div className="relative mt-2 ml-auto">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        <span>다른 폴더로 이동</span>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <>
                            {/* 배경 클릭시 닫기 */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsDropdownOpen(false)}
                            />

                            {/* 드롭다운 메뉴 */}
                            <div className="absolute right-0 z-20 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                                {otherFolders.map((folder) => (
                                    <button
                                        key={folder.folderId}
                                        onClick={() => handleFolderChange(folder.folderId)}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                                    >
                                        <div
                                            className="w-4 h-4 rounded-full shrink-0"
                                            style={{ backgroundColor: folder.color }}
                                        />
                                        <span className="text-sm font-medium text-gray-900 truncate">
                                            {folder.name}
                                        </span>
                                        {folder.isPinned && (
                                            <span className="ml-auto text-xs text-gray-400">📌</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
      </div>
    )
}