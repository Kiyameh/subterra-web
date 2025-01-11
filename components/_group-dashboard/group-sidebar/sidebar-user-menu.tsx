'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import UserDropdownMenuContent from '@/components/_authentication/floating-user-control/user-dropdown-menu-content'
import {LuChevronsUpDown} from 'react-icons/lu'
import {Session} from 'next-auth'

/**
 * @version 1
 * @description Panel de navegación de usuario para colocar en un Sidebar
 * @param user - Usuario actual de la sesión
 */

export default function SidebarUserMenu({user}: {user: Session['user']}) {
  const {isMobile} = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* Trigger del menú desplegable */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user.image && (
                  <AvatarImage
                    src={user.image}
                    alt={'Avatar'}
                  />
                )}
                <AvatarFallback className="rounded-lg">
                  {user?.name?.slice(0, 2).toUpperCase() || 'US'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <LuChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Contenido del menú desplegable */}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <UserDropdownMenuContent user={user} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
