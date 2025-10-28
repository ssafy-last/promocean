// frontend/src/components/section/SidebarSection.tsx

import React from 'react'
import SidebarList from '../list/SidebarList'
import MagnifyingGlass from '@/components/icon/MagnifyingGlass'
import QuestionMarkCircle from '@/components/icon/QuestionMarkCircle'
import Trophy from '@/components/icon/Trophy'
import Megaphone from '@/components/icon/Megaphone'
import User from '@/components/icon/User'
import UserGroup from '@/components/icon/UserGroup'

/**
 * SidebarSection component
 * @description SidebarSection component is a sidebar section component that displays the sidebar section content
 * @returns {React.ReactNode}
 */
export default function SidebarSection() {
  // 커뮤니티 섹션
  const communityItems = [{
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
  const spaceItems = [{
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
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold uppercase tracking-wider mb-3">
          커뮤니티
        </h2>
        <SidebarList items={communityItems} />
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold uppercase tracking-wider mb-3">
          스페이스
        </h2>
        <SidebarList items={spaceItems} />
      </div>
    </div>
  )
}