// frontend/src/components/layout/SidebarHeader.tsx

import React from 'react'
import Link from 'next/link'

/**
 * SidebarHeader component
 * @description SidebarHeader component is a sidebar header component that displays the sidebar header content
 * @returns {React.ReactNode}
 */
export default function SidebarHeader() {
  return (
    <Link href="/">
      <div className="mb-8">
        <h1 className="text-xl font-bold">PromOcean</h1>
      </div>
    </Link>
  )
}
