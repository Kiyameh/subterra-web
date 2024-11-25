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
import SidebarUserMenu from './sidebar-user-menu'
import SidebarMainNavigation from './sidebar-main-navigation'
import SidebarGroupSelector from './sidebar-group-selector'

// Database:
import {Group} from '@/database/models/Group.model'

// Icons:
import {auth} from '@/auth'
import {Session} from 'next-auth'
import {getAllGroups} from '@/database/actions/data/getAll.actions'

interface GroupSidebarProps extends React.ComponentProps<typeof Sidebar> {
  groupName: string
}

export async function GroupSidebar({groupName, ...props}: GroupSidebarProps) {
  // Obtener todos los grupos de la base de datos:
  const allGroups = (await getAllGroups()).content as Group[]

  // Obtener el grupo actual:
  const currentGroup = allGroups.find((group) => group.name === groupName)

  // Obtener el usuario actual
  const session: Session | null = await auth()
  const user = session?.user

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarGroupSelector
          allGroups={allGroups}
          currentGroup={currentGroup}
        />
      </SidebarHeader>
      <SidebarContent>
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
