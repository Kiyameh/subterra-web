import React from 'react'
import ShortcutTooltip from '@/components/_Atoms/badges/shortcut-tooltip'
import NavigationBreadcrumb from '@/components/navigations/dashboard-breadcrumb'
import InstanceSidebar from '@/components/_instance-dashboard/instace-sidebar/instance-sidebar'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import SubterraDropdown from '@/components/navigations/subterra-dropdown'
import FloatingContactForm from '@/components/_staff-dashboard/floating-contact-form/floating-contact'
import {auth} from '@/auth'
import {
  checkIsEditor,
  getOneInstance,
  InstanceWithUsers,
} from '@/database/services/instance.actions'
import UnauthorizedCard from '@/components/cards/401-unauthorized'
import PageContainer from '@/components/theming/page-container'

interface InstanceDashboardLayoutProps {
  params: Promise<{instance: string}>
  children: React.ReactNode
}

/**
 * Layout principal de la sección de instancia, que incluye la barra lateral
 * y la barra superior.
 */
export default async function InstanceDashboardLayout({
  params,
  children,
}: InstanceDashboardLayoutProps) {
  // Obtener nombre de la instancia de la URL:
  const instanceName = (await params).instance

  // Obtener la instancia actual:
  const instance = (await getOneInstance(instanceName))
    .content as InstanceWithUsers

  // Obtener el suario actual:
  const user = (await auth())?.user

  // Comprobar si la instancia es privada:
  const isPublic = instance?.public_visibility

  // Comprobar si el usuario es editor de la instancia:
  const isEditor = await checkIsEditor(user?._id, instanceName)

  // Obtener el nombre del grupo de la instancia:
  const group = instance?.owner

  return (
    <SidebarProvider>
      {/* Componente de la barra lateral de instancia */}
      <InstanceSidebar instanceName={instanceName} />
      <SidebarInset className="bg-inherit">
        {/* Encabezado de la página */}
        <header className="flex h-12 md:h-10 items-center justify-between pr-4 bg-card transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10 ">
          {/* Botón de la barra lateral */}
          <div className="flex flex-row gap-2 items-center">
            <ShortcutTooltip shortcut="Ctrl+B">
              <SidebarTrigger className="mx-2 text-primary md:text-foreground scale-125 md:scale-100" />
            </ShortcutTooltip>
            <NavigationBreadcrumb />
          </div>
          <SubterraDropdown />
        </header>
        {/* Contenido de la página */}
        <main>
          {!isPublic && !isEditor ? (
            <PageContainer>
              <UnauthorizedCard
                title="Instancia privada"
                text={`La instancia ${instanceName} es privada y solo puede ser accedida por editores. Pertenece a ${group.fullname}, si deseas acceder a ella, solicita permisos al grupo.`}
                redirectUrl={`/group/${group.name}`}
                redirectLabel={`Ir a ${group.fullname}`}
                showContactButton={false}
              />
            </PageContainer>
          ) : (
            <div className="h-full">{children}</div>
          )}
        </main>
      </SidebarInset>
      <nav className="fixed top-6 right-6 z-50 md:bottom-6 md:top-auto">
        <FloatingContactForm commander={user} />
      </nav>
    </SidebarProvider>
  )
}
