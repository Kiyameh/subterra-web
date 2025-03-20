import {SidebarGroup, SidebarGroupLabel} from '@/components/Atoms/sidebar'
import {Session} from 'next-auth'
import {FaInfo} from 'react-icons/fa'

/**
 * @version BETA
 * @description Navegación de favoritos en la barra lateral
 * @param user Usuario de la sesión
 */
export default function SidebarFavNavigation({
  user,
}: {
  user: Session['user'] | null
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{`Favoritos de ${user?.name}`}</SidebarGroupLabel>
      <p className="text-muted-foreground text-xs  ml-2 mt-5 flex items-center gap-2">
        <FaInfo />
        [Funcionalidad en desarrollo]
      </p>
    </SidebarGroup>
  )
}
