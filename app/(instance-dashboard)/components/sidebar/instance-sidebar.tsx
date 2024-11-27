import * as React from 'react'

// Componentes:
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {SidebarLoginButton} from './sidebar-login-button'
import SidebarFavNavigation from './sidebar-fav-navigation'
import SidebarUserNavigation from './sidebar-user-navigation'
import SidebarMainNavigation from './sidebar-main-navigation'
import SidebarInstanceSelector from './sidebar-instance-selector'

// Icons:
import {auth} from '@/auth'
import {Session} from 'next-auth'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getAllInstances} from '@/database/services/instance.services'

interface InstanceSidebarProps extends React.ComponentProps<typeof Sidebar> {
  instanceName: string
}

export async function InstanceSidebar({
  instanceName,
  ...props
}: InstanceSidebarProps) {
  // Obtener las intancias de la base de datos:
  const answer = await getAllInstances()
  const allInstances = answer.content as PopulatedInstance[] | null

  // Obtener la instancia actual:
  const currentInstance = allInstances?.find(
    (instance) => instance.name === instanceName
  ) as PopulatedInstance | null

  // Obtener el usuario actual
  const session: Session | null = await auth()
  const user = session?.user as Session['user'] | null

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        {/*? null manejado en el componente:*/}
        <SidebarInstanceSelector
          allInstances={allInstances}
          currentInstance={currentInstance}
        />
      </SidebarHeader>
      <SidebarContent>
        {/*? null manejado en el componente:*/}
        <SidebarMainNavigation
          currentInstance={currentInstance}
          user={user}
        />
        {user && <SidebarFavNavigation user={user} />}
      </SidebarContent>
      <SidebarFooter>
        {user ? <SidebarUserNavigation user={user} /> : <SidebarLoginButton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
