import React from 'react'
import DualSidebarLayout from '@/components/Templates/sidebars/dual-sidebar-layout'
import HelpSidebar from '@/components/Templates/sidebars/help/help-sidebar'
import GroupSidebar from '@/components/Templates/sidebars/group/group-sidebar'
import PageContainer from '@/components/Organisms/theme/page-container'

/**
 * Layout principal de la sección de grupo
 */
export default async function GroupDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DualSidebarLayout
      leftSlot={<GroupSidebar />}
      rightSlot={<HelpSidebar />}
    >
      {/* Contenido de la página */}
      <PageContainer className="justify-start">{children}</PageContainer>
    </DualSidebarLayout>
  )
}
