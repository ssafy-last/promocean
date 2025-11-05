'use client';

import PlusCircle from "../icon/PlusCircle";

export interface TeamSpaceAddButtonProps {
    isModalRef: boolean;
    setIsModalRef?: (value: boolean) => void;
}   


export default function TeamSpaceAddButton(
    { isModalRef, setIsModalRef }: TeamSpaceAddButtonProps
) {

    const handleClick = () => {
        if (setIsModalRef) {
            setIsModalRef(!isModalRef);
        }
    };

    return (
        <button className="flex flex-row gap-1 font-medium text-2xl hover:text-primary transition-colors"
            onClick={handleClick}
        >
            <PlusCircle/>
            팀 생성
        </button>
    );
}
