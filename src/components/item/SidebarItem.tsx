// frontend/src/components/item/SidebarItem.tsx

import React from 'react'
import Link from 'next/link'
import { SidebarItemProps } from '@/types/item'

/**
 * SidebarItem component
 * @description SidebarItem component is a sidebar item component that displays the sidebar item content
 * @param {SidebarItemProps} props - The props for the SidebarItem component
 * @returns {React.ReactNode}
 */
export default function SidebarItem({ icon, title, href }: SidebarItemProps) {
  return (
    <Link 
      href={href}
      className="flex items-center px-4 pr-8 py-2 text-sm font-medium rounded-md hover:bg-[#5c94f7] hover:text-white transition-colors text-[#343434]"
    >
      <span className="mr-2">{icon}</span>
      {title}
    </Link>
  )
}