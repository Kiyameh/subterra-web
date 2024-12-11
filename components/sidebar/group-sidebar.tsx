import * as React from 'react'
import {auth} from '@/auth'
import {GroupIndex} from '@/database/models/Group.model'
import {checkIsAdmin, getGroupsIndex} from '@/database/services/group.services'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import SidebarGroupSelector from '@/components/sidebar/sidebar-group-selector'
import SidebarGroupNavigation from '@/components/sidebar/sidebar-group-navigation'
import SidebarUserMenu from '@/components/sidebar/sidebar-user-menu'
import SidebarLoginButton from '@/components/sidebar/sidebar-login-button'
import SidebarRoleIndicator from './sidebar-role-indicator'

interface GroupSidebarProps extends React.ComponentProps<typeof Sidebar> {
  groupName: string
}

export default async function GroupSidebar({
  groupName,
  ...props
}: GroupSidebarProps) {
  // Obtener el usuario actual:
  const user = (await auth())?.user

  // Obtener índice de grupos de la base de datos:
  const groupsIndex = (await getGroupsIndex()).content as GroupIndex[] | null

  // Obtener Índice del gropu actual:
  const currentGroupIndex = groupsIndex?.find(
    (group) => group.name === groupName
  ) as GroupIndex | null

  // Comprobar si el usuario es miembro del grupo:
  const isMember = (await checkIsAdmin(groupName, user?._id)).ok as boolean

  // Comprobar si el usuario es admin del grupo:
  const isAdmin = (await checkIsAdmin(groupName, user?._id)).ok as boolean

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        {/*? null manejado en el componente:*/}
        <SidebarGroupSelector
          groupsIndex={groupsIndex}
          currentGroupIndex={currentGroupIndex}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarRoleIndicator
          isEditor={
            isMember
          } /* En grupos, los "editores" se llaman members.  */
          editorTag="Miembro"
          editorText="Eres miembro de este grupo"
          isAdmin={isAdmin}
          adminText="Eres administrador de este grupo"
        />
        {currentGroupIndex && (
          <SidebarGroupNavigation
            isMember={isMember}
            isAdmin={isAdmin}
          />
        )}
      </SidebarContent>
      <SidebarFooter>
        {user ? <SidebarUserMenu user={user} /> : <SidebarLoginButton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
