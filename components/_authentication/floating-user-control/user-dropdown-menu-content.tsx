'use client'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import {MdSettings} from 'react-icons/md'
import {BsFilePersonFill} from 'react-icons/bs'
import {RiEyeCloseLine} from 'react-icons/ri'

import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'
import {Session} from 'next-auth'

/**
 * @version 1
 * @description Componente que renderiza el contenido del menú flotante de usuario
 * @param user - Usuario de la sesión
 */

export default function UserDropdownMenuContent({
  user,
}: {
  user: Session['user']
}) {
  const router = useRouter()

  return (
    <>
      <DropdownMenuLabel>
        <span className="text-primary font-bold mr-1">@</span>
        {user.name || user.email}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => router.push('/auth/profile')}
      >
        <BsFilePersonFill />
        Perfil
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => router.push('/auth/settings')}
      >
        <MdSettings />
        Preferencias
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => signOut()}
      >
        <RiEyeCloseLine />
        Cerrar sesión
      </DropdownMenuItem>
    </>
  )
}
