// frontend/src/components/list/SidebarList.tsx

import React from 'react'
import SidebarItem from '../item/SidebarItem'
import { SidebarItemProps } from '@/types/item'

interface SidebarListProps {
  items: SidebarItemProps[]
}


/**
 * SidebarList component
 * @description SidebarList component is a sidebar list component that displays the sidebar list content
 * @param {SidebarListProps} props - The props for the SidebarList component
 * @returns {React.ReactNode}
 */
export default function SidebarList({ items }: SidebarListProps) {
  return (
    <ul>
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
