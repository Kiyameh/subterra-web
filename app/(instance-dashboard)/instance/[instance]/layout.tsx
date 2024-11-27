import {InstanceSidebar} from '../../components/sidebar/instance-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import NavigationBreadcrumb from '../../../../components/navigation/nav-breadcrumb'
import ShortcutTooltip from '@/components/displaying/shortcut-tooltip'

interface InstanceDashboardLayoutProps {
  params: Promise<{instance: string}>
  children: React.ReactNode
}

export default async function InstanceDashboardLayout({
  params,
  children,
}: InstanceDashboardLayoutProps) {
  // Obtener nombre de la instancia de la URL:
  const instanceName = (await params).instance
  return (
    <SidebarProvider>
      {/* Componente de la barra lateral de instancia */}
      <InstanceSidebar instanceName={instanceName} />
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
