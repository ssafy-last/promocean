// frontend/src/components/item/SidebarItem.tsx

import React from 'react'
import Link from 'next/link'

interface SidebarItemProps {
  icon: string
  title: string
  href: string
}

/**
 * SidebarItem component
 * @description SidebarItem component is a sidebar item component that displays the sidebar item content
 * @param {SidebarItemProps} props - The props for the SidebarItem component
 * @returns {React.ReactNode}
 */
export default function SidebarItem({ icon, title, href }: SidebarItemProps) {
  return (
    <li>
      <Link 
        href={href}
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-primary hover:text-white transition-colors"
        style={{color: '#343434'}}
      >
        <span className="mr-3">{icon}</span>
        {title}
      </Link>
    </li>
  )
}