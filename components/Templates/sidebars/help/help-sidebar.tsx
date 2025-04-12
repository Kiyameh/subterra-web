import React from 'react'
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/Atoms/dual-sidebar'

export default function HelpSidebar() {
  return (
    <>
      <SidebarHeader>
        <p>header</p>
      </SidebarHeader>
      <SidebarContent>
        <>
          <p>content</p>
        </>
      </SidebarContent>
      <SidebarFooter>
        <p>footer</p>
      </SidebarFooter>
      <SidebarRail side="right" />
    </>
  )
}
