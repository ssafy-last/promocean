'use client';

// frontend/src/components/layout/Sidebar.tsx

import React from 'react'
import SidebarHeader from '@/components/layout/SidebarHeader'
import SidebarSection from '@/components/section/SidebarSection'
import SidebarFooter from '@/components/layout/SidebarFooter'
import MagnifyingGlass from '@/components/icon/MagnifyingGlass'
import Trophy from '@/components/icon/Trophy'
import Megaphone from '@/components/icon/Megaphone'
import User from '@/components/icon/User'
import UserGroup from '@/components/icon/UserGroup'
import { SidebarItemProps } from '@/types/itemType'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuthStore } from '@/store/authStore'

/** 
 * Sidebar component
 * @description Sidebar component is a sidebar component that displays the sidebar content
 * @returns {React.ReactNode}
 */
export default function Sidebar() {
  const { isCollapsed } = useSidebar();
  const { isLoggedIn } = useAuthStore();
  // 커뮤니티 섹션
  const communityItems: SidebarItemProps[] = [{
    'icon': <MagnifyingGlass />,
    'title': '커뮤니티',
    'href': '/community',
  },
  {
    'icon': <Trophy />,
    'title': '프롬프트 대회',
    'href': '/contest',
  },
  {
    'icon': <Megaphone />,
    'title': '공지사항',
    'href': '/community',
  },
]

  // 스페이스 섹션
  const spaceItems: SidebarItemProps[] = [{
    'icon': <User />,
    'title': '마이 스페이스',
    'href': '/my-space',
  },
  {
    'icon': <UserGroup />,
    'title': '팀 스페이스',
    'href': '/team-space',
  },
]

  return (
    <div className={`fixed left-0 top-0 ${isCollapsed ? 'w-16' : 'w-64'} h-screen p-4 border-r border-gray-200 flex flex-col transition-all duration-300`} style={{backgroundColor: '#fdfdfc', color: '#343434'}}>
      <div className="flex-1">
        <SidebarHeader />
        
        <SidebarSection title="게시판" items={communityItems} />

        {isLoggedIn && (
          <SidebarSection title="스페이스" items={spaceItems} />
        )}
      </div>

      <div className="mt-auto">
        <SidebarFooter />
      </div>
    </div>
  );
}