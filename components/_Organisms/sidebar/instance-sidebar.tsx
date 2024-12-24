import * as React from 'react'
import {auth} from '@/auth'
import {Session} from 'next-auth'

import {InstanceIndex} from '@/database/services/instance.actions'
import {checkIsCoordinator} from '@/database/services/instance.actions'
import {checkIsEditor} from '@/database/services/instance.actions'
import {getInstancesIndex} from '@/database/services/instance.actions'

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
  // Obtener el usuario actual:
  const user = (await auth())?.user as Session['user'] | null

  // Obtener el índice de instancias:
  const instancesIndex = (await getInstancesIndex()).content as
    | InstanceIndex[]
    | null

  // Obtener el índice de la instancia actual:
  const currentInstanceIndex = instancesIndex?.find(
    (instance) => instance.name === instanceName
  ) as InstanceIndex | null

  // Comprobar si el usuario es editor de la instancia:
  const isEditor = await checkIsEditor(user?._id, instanceName)
  // Comprobar si el usuario es coordinador de la instancia:
  const isCoordinator = await checkIsCoordinator(user?._id, instanceName)
  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        {/*? null manejado en el componente:*/}
        <SidebarInstanceSelector
          instancesIndex={instancesIndex}
          currentInstanceIndex={currentInstanceIndex}
        />
      </SidebarHeader>
      <SidebarContent>
        <>
          <SidebarRoleIndicator
            isEditor={isEditor}
            editorTag="Editor"
            editorText="Eres editor de esta instancia"
            isAdmin={isCoordinator}
            adminTag="Coordinador"
            adminText="Eres coordinador de esta instancia"
          />
          {currentInstanceIndex && (
            <>
              <SidebarSearchBar baseUrl={`/instance/${instanceName}`} />
              <SidebarInstanceNavigation
                isEditor={isEditor}
                isCoordinator={isCoordinator}
              />
            </>
          )}
          {user && <SidebarFavNavigation user={user} />}
        </>
      </SidebarContent>
      <SidebarFooter>
        {user ? <SidebarUserMenu user={user} /> : <SidebarLoginButton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
