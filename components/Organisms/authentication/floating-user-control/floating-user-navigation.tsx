'use client'
import React from 'react'
import {type Session} from 'next-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/Atoms/dropdown-menu'
import AvatarButton from './avatar-button'
import UserDropdownMenuContent from '@/components/Organisms/authentication/floating-user-control/user-dropdown-menu-content'

/**
 * @version 1
 * @description Componente que renderiza un menú flotante con opciones de usuario
 * @param user - Usuario de la sesión
 */

export default function FloatingUserNavigation({
  user,
}: {
  user: Session['user']
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <AvatarButton user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-3">
        <UserDropdownMenuContent user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
