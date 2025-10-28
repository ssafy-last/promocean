// frontend/src/components/list/SidebarList.tsx

import React from 'react'
import SidebarItem from '../item/SidebarItem'

interface SidebarItemType {
  icon: string
  title: string
  href: string
}

interface SidebarListProps {
  items: SidebarItemType[]
}


/**
 * SidebarList component
 * @description SidebarList component is a sidebar list component that displays the sidebar list content
 * @param {SidebarListProps} props - The props for the SidebarList component
 * @returns {React.ReactNode}
 */
export default function SidebarList({ items }: SidebarListProps) {
  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <SidebarItem 
          key={index}
          icon={item.icon}
          title={item.title}
          href={item.href}
        />
      ))}
    </ul>
  )
}
