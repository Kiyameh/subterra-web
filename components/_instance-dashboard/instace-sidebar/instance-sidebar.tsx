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

import SidebarInstanceSelector from './sidebar-instance-selector'
import SidebarInstanceRoleBox from './sidebar-instance-role-box'
import SidebarSearchBar from './sidebar-search-bar'
import SidebarInstanceNavigation from './sidebar-instance-navigation'
import SidebarFavNavigation from './sidebar-fav-navigation'
import SidebarUserMenu from './sidebar-user-menu'
import SidebarLoginButton from './sidebar-login-button'

interface InstanceSidebarProps extends React.ComponentProps<typeof Sidebar> {
  instanceName: string | undefined
}

/**
 * @version 1
 * @description Sidebar para instancias
 * @param instanceName Nombre de la instancia
 */
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
  const isCoordinator = await checkIsCoordinator(user?._id, instanceName || '')
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
          <SidebarInstanceRoleBox
            isEditor={isEditor}
            isCoordinator={isCoordinator}
            instanceId={currentInstanceIndex?._id}
            userId={user?._id}
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
