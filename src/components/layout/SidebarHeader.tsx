// frontend/src/components/layout/SidebarHeader.tsx

import React from 'react'
import Link from 'next/link'
import Promocean from '../icon/Promocean'
import ChevronLeft from '../icon/ChevronLeft'

/**
 * SidebarHeader component
 * @description SidebarHeader component is a sidebar header component that displays the sidebar header content
 * @returns {React.ReactNode}
 */
export default function SidebarHeader() {
  return (
    <Link href="/" className="block mb-8">
      <div className="flex items-center justify-between">
        
        {/* 왼쪽: 아이콘 + 텍스트 */}
        <div className="flex items-center gap-2">
          <Promocean />
          <h1 className="text-xl font-bold">PromOcean</h1>
        </div>

        {/* 오른쪽: 토글 버튼 */}
        <ChevronLeft />
      </div>
    </Link>
  )
}
