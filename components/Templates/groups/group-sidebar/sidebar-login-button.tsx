'use client'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/Atoms/sidebar'
import LoginWrapper from '@/components/Organisms/authentication/login-wrapper'

import {BiLogIn} from 'react-icons/bi'

/**
 * @version 1
 * @description Botón de inicio de sesión para colocar en un Sidebar
 */

export default function SidebarLoginButton() {
  const {isMobile, toggleSidebar} = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <LoginWrapper>
          <SidebarMenuButton
            onClick={() => {
              if (isMobile) toggleSidebar()
            }}
          >
            <BiLogIn className="scale-125" />
            <span>Iniciar sesión</span>
          </SidebarMenuButton>
        </LoginWrapper>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
