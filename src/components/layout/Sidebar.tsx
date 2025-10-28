// frontend/src/components/layout/Sidebar.tsx

import React from 'react'
import SidebarHeader from '@/components/layout/SidebarHeader'
import SidebarSection from '@/components/section/SidebarSection'
import SidebarFooter from '@/components/layout/SidebarFooter'
import MagnifyingGlass from '@/components/icon/MagnifyingGlass'
import QuestionMarkCircle from '@/components/icon/QuestionMarkCircle'
import Trophy from '@/components/icon/Trophy'
import Megaphone from '@/components/icon/Megaphone'
import User from '@/components/icon/User'
import UserGroup from '@/components/icon/UserGroup'
import { SidebarItemProps } from '@/types/item'

/** 
 * Sidebar component
 * @description Sidebar component is a sidebar component that displays the sidebar content
 * @returns {React.ReactNode}
 */
export default function Sidebar() {

    // 커뮤니티 섹션
    const communityItems: SidebarItemProps[] = [{
      'icon': <MagnifyingGlass />,
      'title': '프롬프트 검색',
      'href': '/community',
    },
    {
      'icon': <QuestionMarkCircle />,
      'title': '프롬프트 질문',
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
    <div className="w-64 min-h-screen p-4 border-r border-gray-200 flex flex-col" style={{backgroundColor: '#fdfdfc', color: '#343434'}}>
      <div className="flex-1">
        <SidebarHeader />
        
        <SidebarSection title="커뮤니티" items={communityItems} />
        <SidebarSection title="스페이스" items={spaceItems} />
      </div>

      <div className="mt-auto">
        <SidebarFooter />
      </div>
    </div>
  );
}