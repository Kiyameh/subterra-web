import * as React from 'react'
import {auth} from '@/auth'
import {Session} from 'next-auth'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getAllInstances} from '@/database/services/instance.services'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import SidebarFavNavigation from './sidebar-fav-navigation'
import SidebarInstanceSelector from './sidebar-instance-selector'
import SidebarLoginButton from './sidebar-login-button'
import SidebarInstanceNavigation from './sidebar-instance-navigation'
import SidebarRoleIndicator from './sidebar-role-indicator'
import SidebarSearchBar from './sidebar-search-bar'
import SidebarUserMenu from './sidebar-user-menu'

interface InstanceSidebarProps extends React.ComponentProps<typeof Sidebar> {
  instanceName: string
}

export default async function InstanceSidebar({
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

  // Validar roles de usuario:
  let isEditor = false
  let isAdmin = false
  const userId = user?._id
  if (userId && currentInstance) {
    currentInstance.editors.map((editor) => {
      if (editor._id === userId) {
        isEditor = true
      }
    })
    isAdmin = currentInstance.admin._id === userId
  }

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
      {currentInstance && (
        <SidebarContent>
          <SidebarRoleIndicator
            isEditor={isEditor}
            isAdmin={isAdmin}
          />
          <SidebarSearchBar baseUrl={`/instance/${instanceName}`} />
          <SidebarInstanceNavigation
            isEditor={isEditor}
            isAdmin={isAdmin}
          />
          {user && <SidebarFavNavigation user={user} />}
        </SidebarContent>
      )}
      <SidebarFooter>
        {user ? <SidebarUserMenu user={user} /> : <SidebarLoginButton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
