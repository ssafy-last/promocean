'use client';

// frontend/src/contexts/SidebarContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * SidebarProvider component
 * @description SidebarProvider component is a sidebar provider component that provides the sidebar context
 * @param {ReactNode} children - The children of the SidebarProvider component
 * @returns {ReactNode}
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  // CSS 변수로 메인 콘텐츠 마진 설정
  React.useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '4rem' : '16rem');
  }, [isCollapsed]);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
