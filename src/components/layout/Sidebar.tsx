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
  return (
    <div className="w-64 min-h-screen p-4 border-r border-gray-200 flex flex-col" style={{backgroundColor: '#fdfdfc', color: '#343434'}}>
      <div className="flex-1">
        <SidebarHeader />
        
        <SidebarSection />
      </div>

      <div className="mt-auto">
        <SidebarFooter />
      </div>
    </div>
  );
}