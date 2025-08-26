import React from 'react'
import SidebarInstanceSelector from './sidebar-instance-selector'
import SidebarInstanceRoleBox from './sidebar-instance-role-box'
import SidebarSearchBar from './sidebar-search-bar'
import SidebarInstanceNavigation from './sidebar-instance-navigation'
import SidebarFavNavigation from './sidebar-fav-navigation'
import SidebarUserMenu from './sidebar-user-menu'
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/Atoms/dual-sidebar'

export default function InstanceSidebar() {
  return (
    <>
      <SidebarHeader>
        <SidebarInstanceSelector />
      </SidebarHeader>
      <SidebarContent>
        <>
          <SidebarInstanceRoleBox />
          <SidebarSearchBar />
          <SidebarInstanceNavigation />
          <SidebarFavNavigation />
        </>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
      <SidebarRail side="left" />
    </>
  )
}
