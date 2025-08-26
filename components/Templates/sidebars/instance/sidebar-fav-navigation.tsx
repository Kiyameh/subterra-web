'use client'
import {useSession} from 'next-auth/react'

import {SidebarGroup, SidebarGroupLabel} from '@/components/Atoms/dual-sidebar'

import {FaInfo} from 'react-icons/fa'

/**
 * @version BETA
 * @description Navegación de favoritos en la barra lateral
 * @param user Usuario de la sesión
 */
export default function SidebarFavNavigation() {
  // Obtener el usuario
  const {data: session} = useSession()
  const user = session?.user

  if (!user) return null

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
