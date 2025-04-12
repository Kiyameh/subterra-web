'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/Atoms/dropdown-menu'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/Atoms/avatar'
import UserDropdownMenuContent from '@/components/Organisms/authentication/floating-user-control/user-dropdown-menu-content'

import {LuChevronsUpDown} from 'react-icons/lu'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  useDualSidebar,
} from '@/components/Atoms/dual-sidebar'
import {useSession} from 'next-auth/react'
import LoginWrapper from '@/components/Organisms/authentication/login-wrapper'
import {BiLogIn} from 'react-icons/bi'

/**
 * @version 2
 * @description Panel de navegación de usuario para colocar en un Sidebar
 */

export default function SidebarUserMenu() {
  // Obtener el usuario
  const {data: session} = useSession()
  const user = session?.user

  const {isMobile} = useDualSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {user ? (
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
        ) : (
          <LoginWrapper>
            <SidebarMenuButton>
              <BiLogIn className="scale-125" />
              <span>Iniciar sesión</span>
            </SidebarMenuButton>
          </LoginWrapper>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
