import {InstanceSidebar} from './components/sidebar/instance-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import NavigationBreadcrumb from './components/breadcrumb/nav-breadcrumb'

export default function InstanceDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <InstanceSidebar />
      <SidebarInset>
        <header className="bg-card flex h-10 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
          <div className="flex items-center gap-6 px-4">
            <SidebarTrigger />
            <NavigationBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
