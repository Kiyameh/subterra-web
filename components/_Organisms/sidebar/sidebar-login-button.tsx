import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import {BiLogIn} from 'react-icons/bi'

/**
 * Botón de inicio de sesión para colocar en un Sidebar
 */

export default function SidebarLoginButton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/auth/login">
          <SidebarMenuButton>
            <BiLogIn className="scale-125" />
            <span>Iniciar sesión</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
