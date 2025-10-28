// frontend/src/components/layout/Sidebar.tsx

import React from 'react'
import SidebarHeader from '@/components/layout/SidebarHeader'
import SidebarSection from '@/components/section/SidebarSection'
import SidebarFooter from '@/components/layout/SidebarFooter'

/**
 * Sidebar component
 * @description Sidebar component is a sidebar component that displays the sidebar content
 * @returns {React.ReactNode}
 */
export default function Sidebar() {
  const sidebarHeader = 'Promocean'

  // sidebar contests section
  const contentHeader = '게시판'
  const sidebarContents = [{
    'icon': '🌐',
    'title': '프롬프트 찾기',
    'href': '/community',
  },
  {
    'icon': '❓',
    'title': '프롬프트 Q&A',
    'href': '/community',
  },
  {
    'icon': '🏆',
    'title': '프롬프트 대회',
    'href': '/contest',
  },
  {
    'icon': '📢',
    'title': '공지사항',
    'href': '/community',
  },
]

  // sidebar spaces section
  const spaceHeader = 'Spaces'
  const sidebarSpaces = [{
    'icon': '👤',
    'title': '마이 스페이스',
    'href': '/my-space',
  },
  {
    'icon': '👥',
    'title': '팀 스페이스',
    'href': '/team-space',
  },
]

  return (
    <div className="w-64 min-h-screen p-4 border-r border-gray-200" style={{backgroundColor: '#fdfdfc', color: '#343434'}}>
      <SidebarHeader header={sidebarHeader} />
      
      <SidebarSection 
        header={contentHeader} 
        items={sidebarContents} 
      />
      
      <SidebarSection 
        header={spaceHeader} 
        items={sidebarSpaces} 
      />

      <SidebarFooter />
    </div>
  );
}