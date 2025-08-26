import React from 'react'
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/Atoms/dual-sidebar'
import SidebarGroupSelector from './sidebar-group-selector'
import SidebarGroupRoleBox from './sidebar-group-role-box'
import SidebarGroupNavigation from './sidebar-group-navigation'
import SidebarUserMenu from '../instance/sidebar-user-menu'

export default function GroupSidebar() {
  return (
    <>
      <SidebarHeader>
        <SidebarGroupSelector />
      </SidebarHeader>
      <SidebarContent>
        <>
          <SidebarGroupRoleBox />
          <SidebarGroupNavigation />
        </>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
      <SidebarRail side="left" />
    </>
  )
}
