// frontend/src/components/section/CommunityHashtagSection.tsx

import CommunityHashtagList from "@/components/list/CommunityHashtagList";
import { HashtagItemProps } from "@/types/itemType";

/**
 * CommunityHashtagSection component
 * @description CommunityHashtagSection component is a community hashtag section component that displays the community hashtag section content
 * @returns {React.ReactNode}
 */
export default function CommunityHashtagSection( { hashtagList }: { hashtagList: HashtagItemProps[] } ) {
  
  return (
    <div>
      <CommunityHashtagList hashtagList={hashtagList} />
    </div>
  )
}