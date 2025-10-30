'use client';

// frontend/src/components/item/SidebarItem.tsx

import React from 'react'
import Link from 'next/link'
import { SidebarItemProps } from '@/types/itemType'
import { useSidebar } from '@/contexts/SidebarContext'

/**
 * SidebarItem component
 * @description SidebarItem component is a sidebar item component that displays the sidebar item content
 * @param {SidebarItemProps} props - The props for the SidebarItem component
 * @returns {React.ReactNode}
 */
export default function SidebarItem({ icon, title, href, onClick }: SidebarItemProps) {
  const { isCollapsed } = useSidebar();

  const className = `flex items-center py-2 text-sm font-medium rounded-md hover:bg-primary hover:text-white transition-colors text-[#343434] ${
    isCollapsed ? 'px-2 justify-center' : 'px-4 pr-8'
  }`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        title={isCollapsed ? title : undefined}
      >
        <span className={isCollapsed ? '' : 'mr-2'}>{icon}</span>
        {!isCollapsed && title}
      </button>
    );
  }

  return (
    <Link 
      href={href}
      className={className}
      title={isCollapsed ? title : undefined}
    >
      <span className={isCollapsed ? '' : 'mr-2'}>{icon}</span>
      {!isCollapsed && title}
    </Link>
  )
}