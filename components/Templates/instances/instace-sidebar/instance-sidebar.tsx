import * as React from 'react'
import {auth} from '@/auth'
import {Session} from 'next-auth'

import {
  getAllInstances,
  InstanceWithOwner,
} from '@/database/services/Instance/getAllInstances'
import {checkIsCoordinator} from '@/database/services/Instance/membership/checkIsCoordinator'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/Atoms/sidebar'

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
  const allInstances = (await getAllInstances()).content as
    | InstanceWithOwner[]
    | null

  // Obtener el índice de la instancia actual:
  const currentInstance = allInstances?.find(
    (instance) => instance.name === instanceName
  ) as InstanceWithOwner | null

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
          allInstances={allInstances}
          currentInstance={currentInstance}
        />
      </SidebarHeader>
      <SidebarContent>
        <>
          <SidebarInstanceRoleBox
            isEditor={isEditor}
            isCoordinator={isCoordinator}
            instanceId={currentInstance?._id}
            userId={user?._id}
          />
          {currentInstance && (
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
