// frontend/src/components/section/ContestCardSection.tsx

import ContestCardList from '@/components/list/ContestCardList'
import { ContestCardItemProps } from '@/types/itemType'

interface ContestCardSectionProps {
  contestCardList: ContestCardItemProps[]
}

/**
 * ContestCardSection component
 * @description ContestCardSection component is a contest card section component that displays the contest card section content
 * @returns {React.ReactNode}
 */
export default function ContestCardSection({ contestCardList }: ContestCardSectionProps) {
  return (
    <div className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text mb-2">프롬프트 대회</h2>
          <p className="text-gray-600">다양한 주제의 프롬프트 대회에 참여해보세요</p>
        </div>
        
        {/* Contest Cards Grid */}
        <ContestCardList contestCards={contestCardList} />
      </div>
    </div>
  )
}

