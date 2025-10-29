'use client';

// frontend/src/components/item/SidebarItem.tsx

import React from 'react'
import Link from 'next/link'
import { SidebarItemProps } from '@/types/item'
import { useSidebar } from '@/contexts/SidebarContext'

/**
 * SidebarItem component
 * @description SidebarItem component is a sidebar item component that displays the sidebar item content
 * @param {SidebarItemProps} props - The props for the SidebarItem component
 * @returns {React.ReactNode}
 */
export default function SidebarItem({ icon, title, href }: SidebarItemProps) {
  const { isCollapsed } = useSidebar();

  return (
    <Link 
      href={href}
      className={`flex items-center py-2 text-sm font-medium rounded-md hover:bg-[#5c94f7] hover:text-white transition-colors text-[#343434] ${
        isCollapsed ? 'px-2 justify-center' : 'px-4 pr-8'
      }`}
      title={isCollapsed ? title : undefined}
    >
      <span className={isCollapsed ? '' : 'mr-2'}>{icon}</span>
      {!isCollapsed && title}
    </Link>
  )
}