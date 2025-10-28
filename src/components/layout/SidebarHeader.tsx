// frontend/src/components/layout/SidebarHeader.tsx\

import React from 'react'

interface SidebarHeaderProps {
  header: string
}

/**
 * SidebarHeader component
 * @description SidebarHeader component is a sidebar header component that displays the sidebar header content
 * @param {SidebarHeaderProps} props - The props for the SidebarHeader component
 * @returns {React.ReactNode}
 */
export default function SidebarHeader({ header }: SidebarHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-bold">{header}</h1>
    </div>
  )
}
