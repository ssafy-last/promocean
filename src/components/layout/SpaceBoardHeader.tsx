

export interface SpaceBoardHeaderProps {
    titleName : string
    description? : string
}



export function SpaceBoardHeader(   { titleName : TitleName, description } : SpaceBoardHeaderProps ) {
    return(
        <div className="flex flex-col justify-start max-w-6xl px-4 py-3 text-[40px] font-bold text-gray-900">
            <h1 className="text-[40px] font-bold text-gray-900">{TitleName}</h1>
            {description && <span className="text-sm font-normal">{description}</span>}
      </div>
    )
}