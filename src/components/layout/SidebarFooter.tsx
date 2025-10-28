// frontend/src/components/layout/SidebarFooter.tsx

import React from 'react'
import SidebarItem from '../item/SidebarItem'
import UserCircle from '../icon/UserCircle'
import Cog9Tooth from '../icon/Cog9Tooth'
import ArrowRightStartOnRectangle from '../icon/ArrowRightStartOnRectangle'

/**
 * SidebarFooter component
 * @description SidebarFooter component is a sidebar footer component that displays the sidebar footer content
 * @returns {React.ReactNode}
 */
export default function SidebarFooter() {
  return (
    <div>
      <SidebarItem 
        icon={<UserCircle />}
        title="마이 페이지"
        href="/my-page"
      />
      <SidebarItem 
        icon={<Cog9Tooth />}
        title="설정"
        href="/settings"
      />
      <SidebarItem 
        icon={<ArrowRightStartOnRectangle />}
        title="로그아웃"
        href="/logout"
      />
    </div>
  )
}