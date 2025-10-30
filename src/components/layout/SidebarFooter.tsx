// frontend/src/components/layout/SidebarFooter.tsx
'use client';

import React from 'react'
import SidebarItem from '../item/SidebarItem'
import UserCircle from '../icon/UserCircle'
import Cog9Tooth from '../icon/Cog9Tooth'
import ArrowRightStartOnRectangle from '@/components/icon/ArrowRightStartOnRectangle'
import ArrowRightEndOnRectangle from '@/components/icon/ArrowRightEndOnRectangle'
import { useAuthStore } from '@/store/authStore'

/**
 * SidebarFooter component
 * @description SidebarFooter component is a sidebar footer component that displays the sidebar footer content
 * @returns {React.ReactNode}
 */
export default function SidebarFooter() {

  const { isLoggedIn, user } = useAuthStore();
  const nickname = user?.nickname ?? '마이 페이지';
  const avatarIcon = user?.profileUrl
    ? (<img src={user.profileUrl} alt={nickname} className="w-5 h-5 rounded-full object-cover" />)
    : (<UserCircle />);
  const { logout } = useAuthStore();
  
  return (
    <div>
      {isLoggedIn && (
        <SidebarItem 
          icon={avatarIcon}
          title={nickname}
          href="/auth/mypage"
        />
      )}

      {/* Todo: 설정 필요 없으면 제거하기 */}
      {isLoggedIn && (
      <SidebarItem 
        icon={<Cog9Tooth />}
        title="설정"
        href="/settings"
      />
      )}
      {isLoggedIn && (
        <SidebarItem 
          icon={<ArrowRightStartOnRectangle />}
          title="로그아웃"
          onClick={() => logout()}
        />
      )}

      {!isLoggedIn && (
        <SidebarItem 
          icon={<ArrowRightEndOnRectangle />}
          title="로그인"
          href="/auth/login?tab=login"
        />
      )}
    </div>
  )
}