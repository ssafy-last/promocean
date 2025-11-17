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
  const { isCollapsed, showText, isCollapsing } = useSidebar();

  const baseClass =
    'flex w-full items-center py-2 text-sm font-medium rounded-md hover:bg-primary hover:text-white transition-colors text-[#343434]';

  // transition 완료 후 접는 중이 아닐 때만 justify-center 적용
  const layoutClass = (isCollapsed && !isCollapsing) ? 'px-2 justify-center' : 'pl-1 pr-8';
  const className = `${baseClass} ${layoutClass}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        title={isCollapsed ? title : undefined}
      >
        <span className="flex-shrink-0">{icon}</span>
        {showText && (
          <span className="ml-4 whitespace-nowrap">{title}</span>
        )}
      </button>
    );
  }

  return (
    <Link
      href={href ?? ''}
      className={className}
      title={isCollapsed ? title : undefined}
    >
      <span className="flex-shrink-0">{icon}</span>
      {showText && (
        <span className="ml-4 whitespace-nowrap">{title}</span>
      )}
    </Link>
  );
}
