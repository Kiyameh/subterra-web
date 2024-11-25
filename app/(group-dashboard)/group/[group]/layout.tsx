import ShortcutTooltip from '@/components/displaying/shortcut-tooltip'
import NavigationBreadcrumb from '@/components/navigation/nav-breadcrumb'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {GroupSidebar} from '../../components/sidebar/group-sidebar'

interface GroupDashboardLayoutProps {
  params: Promise<{group: string}>
  children: React.ReactNode
}

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
        <header className="bg-card flex h-10 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
          <ShortcutTooltip shortcut="Ctrl+B">
            <SidebarTrigger className="mx-2" />
          </ShortcutTooltip>
          <NavigationBreadcrumb />
        </header>
        {/* Contenido de la página */}
        <main className="h-full flex items-center justify-center">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
