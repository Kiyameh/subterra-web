import React from 'react'
import ShortcutTooltip from '@/components/_Atoms/badges/shortcut-tooltip'
import NavigationBreadcrumb from '@/components/_Organisms/navs/nav-breadcrumb'
import GroupSidebar from '@/components/sidebar/group-sidebar'

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'

interface GroupDashboardLayoutProps {
  params: Promise<{group: string}>
  children: React.ReactElement
}

/**
 * Layout principal de la sección de grupo, que incluye la barra lateral
 * y la barra superior.
 */
export default async function GroupDashboardLayout({
  params,
  children,
}: GroupDashboardLayoutProps) {
  // Obtener nombre del grupo de la URL:
  const groupName = (await params).group
  return (
    <SidebarProvider>
      {/* Componente de la barra lateral del grupo */}
      <GroupSidebar groupName={groupName} />
      <SidebarInset className="bg-inherit">
        {/* Encabezado de la página */}
        <header className="flex h-10 items-center gap-2 bg-card transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
          <ShortcutTooltip shortcut="Ctrl+B">
            <SidebarTrigger className="mx-2" />
          </ShortcutTooltip>
          <NavigationBreadcrumb />
        </header>
        {/* Contenido de la página */}
        <main className="flex h-full items-center justify-center">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
