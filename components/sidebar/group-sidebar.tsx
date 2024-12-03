import * as React from 'react'
import {auth} from '@/auth'
import {Session} from 'next-auth'
import {PopulatedGroup} from '@/database/models/Group.model'
import {getAllGroups} from '@/database/services/group.services'

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
  // Obtener todos los grupos de la base de datos:
  const answer = await getAllGroups()
  const allGroups = answer.content as PopulatedGroup[] | null

  // Obtener el grupo actual:
  const currentGroup = allGroups?.find(
    (group) => group.name === groupName
  ) as PopulatedGroup | null

  // Obtener el usuario actual
  const session: Session | null = await auth()
  const user = session?.user as Session['user'] | null

  // Validar roles de usuario:
  let isMember = false
  let isAdmin = false
  const userId = user?._id
  if (userId && currentGroup) {
    currentGroup.members.map((member) => {
      if (member._id === userId) {
        isMember = true
      }
    })
    isAdmin = currentGroup.admin._id === userId
  }

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        {/*? null manejado en el componente:*/}
        <SidebarGroupSelector
          allGroups={allGroups}
          currentGroup={currentGroup}
        />
      </SidebarHeader>

      <SidebarContent>
        {currentGroup && (
          <>
            <SidebarRoleIndicator
              isEditor={
                isMember
              } /* En grupos, los "editores" se llaman members.  */
              editorTag="Miembro"
              editorText="Eres miembro de este grupo"
              isAdmin={isAdmin}
              adminText="Eres administrador de este grupo"
            />

            <SidebarGroupNavigation
              isMember={isMember}
              isAdmin={isAdmin}
            />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        {user ? <SidebarUserMenu user={user} /> : <SidebarLoginButton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
