import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import {FaRegStar} from 'react-icons/fa'

interface Props {
  favs: {
    name: string
    href: string
  }[]
}

/**
 * Panel de navegación de favoritos para colocar en un sidebar
 * @param {{name: string, href: string}[]} favs - Lista de favoritos //TODO: Actualizar si necesario
 */
export default function SidebarFavNavigation({favs}: Props) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favoritos</SidebarGroupLabel>
      <SidebarMenu>
        {favs.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.href}>
                <FaRegStar />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
