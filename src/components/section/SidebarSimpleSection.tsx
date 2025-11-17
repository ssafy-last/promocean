'use client';

// frontend/src/components/section/SidebarSection.tsx

import React from 'react'
import SidebarList from '@/components/list/SidebarList'
import { SidebarItemProps } from '@/types/itemType'
import { useSidebar } from '@/contexts/SidebarContext'
import SidebarItem from '../item/SidebarItem';

interface SidebarSectionProps {
  title: string
  sidebarList: SidebarItemProps[]
}

/**
 * SidebarSection component
 * @description SidebarSection component is a sidebar section component that displays the sidebar section content
 * @param {SidebarSectionProps} props - The props for the SidebarSection component
 * @returns {React.ReactNode}
 */
export default function SidebarSection({title, sidebarList}: SidebarSectionProps) {
  const { isCollapsed } = useSidebar();

  const callback = ()=>{
    console.log("콜백 함수 실행됨");
  }

  return (
    <div className="mb-6">


        <SidebarItem 
          icon={sidebarList[0].icon}
          title={sidebarList[0].title}
          onClick ={callback}
        />
  
    </div>
  );
}