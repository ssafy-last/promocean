// frontend/src/components/list/ContestCardList.tsx

import ContestCardItem from '@/components/item/ContestCardItem'
import { ContestCardItemProps } from '@/types/itemType'

interface ContestCardListProps {
  contestCards: ContestCardItemProps[]
}

/**
 * ContestCardList component
 * @description ContestCardList component is a contest card list component that displays the contest card list content
 * @returns {React.ReactNode}
 */
export default function ContestCardList({ contestCards }: ContestCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {contestCards.map((contestCard) => (
        <ContestCardItem
          key={contestCard.contestId}
          {...contestCard}
        />
      ))}
    </div>
  )
}

