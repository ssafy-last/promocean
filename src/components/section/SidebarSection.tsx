// frontend/src/components/section/SidebarSection.tsx

import React from 'react'
import SidebarList from '../list/SidebarList'
import { SidebarItemProps } from '@/types/item'

interface SidebarSectionProps {
  title: string
  items: SidebarItemProps[]
}

/**
 * SidebarSection component
 * @description SidebarSection component is a sidebar section component that displays the sidebar section content
 * @param {SidebarSectionProps} props - The props for the SidebarSection component
 * @returns {React.ReactNode}
 */
export default function SidebarSection({title, items}: SidebarSectionProps) {

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold uppercase tracking-wider mb-3">
          {title}
        </h2>
        <SidebarList items={items} />
      </div>
    </div>
  )
}