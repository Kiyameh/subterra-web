import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {SidebarLoginButton} from './sidebar-login-button'
import SidebarUserMenu from './sidebar-user-menu'
import SidebarMainNavigation from './sidebar-main-navigation'
import SidebarGroupSelector from './sidebar-group-selector'

import {auth} from '@/auth'
import {Session} from 'next-auth'
import {getAllGroups} from '@/database/services/group.services'
import {PopulatedGroup} from '@/database/models/Group.model'

interface GroupSidebarProps extends React.ComponentProps<typeof Sidebar> {
  groupName: string
}

export async function GroupSidebar({groupName, ...props}: GroupSidebarProps) {
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
        {/*? null manejado en el componente:*/}
        <SidebarMainNavigation
          currentGroup={currentGroup}
          user={user}
        />
      </SidebarContent>
      <SidebarFooter>
        {user ? <SidebarUserMenu user={user} /> : <SidebarLoginButton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
