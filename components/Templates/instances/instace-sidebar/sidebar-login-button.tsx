import LoginWrapper from '@/components/Organisms/authentication/login-wrapper'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/Atoms/sidebar'

import {BiLogIn} from 'react-icons/bi'

/**
 * @version 1
 * @description Botón de inicio de sesión para colocar en un Sidebar
 */

export default function SidebarLoginButton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <LoginWrapper>
          <SidebarMenuButton>
            <BiLogIn className="scale-125" />
            <span>Iniciar sesión</span>
          </SidebarMenuButton>
        </LoginWrapper>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
