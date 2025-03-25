import React from 'react'
import {auth} from '@/auth'

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/Atoms/sidebar'
import ShortcutTooltip from '@/components/Molecules/badges/shortcut-tooltip'
import NavigationBreadcrumb from '@/components/Organisms/navigation/dashboard-breadcrumb'
import SubterraDropdown from '@/components/Organisms/navigation/subterra-dropdown'
import GroupSidebar from '@/components/Templates/groups/group-sidebar/group-sidebar'
import FloatingContactForm from '@/components/Templates/staff-dashboard/floating-contact-form/floating-contact'

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

  // Obtener el suario actual:
  const user = (await auth())?.user
  return (
    <SidebarProvider>
      {/* Componente de la barra lateral del grupo */}
      <GroupSidebar groupName={groupName} />
      <SidebarInset className="bg-inherit">
        {/* Encabezado de la página */}
        <header className="flex h-12 md:h-10 items-center justify-between pr-4 bg-card transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10 fixed top-0 w-full z-50">
          <div className="flex flex-row gap-2 items-center">
            <ShortcutTooltip shortcut="Ctrl+B">
              <SidebarTrigger className="mx-2 text-primary md:text-foreground scale-125 md:scale-100" />
            </ShortcutTooltip>
            <NavigationBreadcrumb />
          </div>
          <div className="fixed right-5 top-2">
            <SubterraDropdown />
          </div>
        </header>
        {/* Contenido de la página */}
        <main className="flex h-full items-center justify-center pt-10">
          {children}
        </main>
      </SidebarInset>
      <nav className="fixed top-6 right-6 z-50 md:bottom-6 md:top-auto">
        <FloatingContactForm commander={user} />
      </nav>
    </SidebarProvider>
  )
}
