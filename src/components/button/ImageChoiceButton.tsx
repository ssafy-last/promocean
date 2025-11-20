import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";
import { useState } from "react";
import { validateImageFile, getFileExtension } from "@/utils/fileValidation";

export interface ImageChoiceButtonProps{
    setSpaceImageState : (file : File | null) => void;
}



/**
 * ImageChoiceButton 컴포넌트는 사용자가 이미지를 선택하고 미리보기를 제공할 수 있는 버튼을 렌더링합니다.
 * @param param0  ImageChoiceButtonProps
 * - setSpaceImageState: 선택된 이미지를 설정하는 함수
 * @returns 
 */
export default function ImageChoiceButton({ setSpaceImageState }: ImageChoiceButtonProps){
    const spaceStore = useSpaceStore();
    const currentSpace = spaceStore.currentSpace;
    const coverImageUrl = currentSpace?.spaceCoverUrl;
    const [spaceImagePreviewState, setSpaceImagePreviewState] = useState<string | null>(coverImageUrl || null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 시그니처(매직 넘버) 검증
        const validation = await validateImageFile(file);

        if (!validation.isValid) {
            alert(validation.error || '유효하지 않은 파일입니다.');
            // 입력 초기화
            e.target.value = '';
            return;
        }

        // 확장자와 실제 파일 형식이 일치하는지 확인 (선택적 경고)
        const fileExtension = getFileExtension(file.name);
        const detectedType = validation.detectedType;

        if (detectedType && fileExtension !== detectedType &&
            !(fileExtension === 'jpeg' && detectedType === 'jpg') &&
            !(fileExtension === 'jpg' && detectedType === 'jpg')) {
            const confirmUpload = confirm(
                `파일 확장자(${fileExtension})와 실제 파일 형식(${detectedType})이 일치하지 않습니다.\n` +
                `실제 형식은 ${detectedType.toUpperCase()} 파일입니다.\n` +
                `계속 진행하시겠습니까?`
            );

            if (!confirmUpload) {
                e.target.value = '';
                return;
            }
        }

        // 검증 통과 - 파일 업로드 진행
        setSpaceImageState(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setSpaceImagePreviewState(reader.result as string);
        };
        reader.readAsDataURL(file);
    };
    
    return(
        
    <div className = "w-full">
        <label className="flex text-sm font-medium py-1 text-gray-700">
            팀 스페이스 이미지
        </label>
        <div className="flex items-center gap-4 w-full h-32">
            <label className="cursor-pointer w-full h-full">

            {spaceImagePreviewState ? (
                <div className="relative w-full h-full">
                    <Image
                        src={spaceImagePreviewState}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="w-full h-full rounded-lg object-cover border border-gray-300"
                    />
                    <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        onClick={(s) => {
    
                            s.preventDefault();
                            setSpaceImageState(null);
                            setSpaceImagePreviewState(null);
                        }}
                    >
                        ×
                    </button>
                </div>
            ) : (
                <div className="w-full h-full rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </label>
        </div>            
    </div>
           
    )

}