// frontend/src/components/section/SidebarSection.tsx

import React from 'react'
import SidebarList from '../list/SidebarList'

interface SidebarItem {
  icon: string
  title: string
  href: string
}

interface SidebarSectionProps {
  header: string
  items: SidebarItem[]
}


/**
 * SidebarSection component
 * @description SidebarSection component is a sidebar section component that displays the sidebar section content
 * @param {SidebarSectionProps} props - The props for the SidebarSection component
 * @returns {React.ReactNode}
 */
export default function SidebarSection({ header, items }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{color: '#5c94f7'}}>
        {header}
      </h2>
      <SidebarList items={items} />
    </div>
  )
}