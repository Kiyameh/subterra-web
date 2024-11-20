'use client'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import {MdSettings} from 'react-icons/md'
import {BsFilePersonFill} from 'react-icons/bs'
import {RiEyeCloseLine} from 'react-icons/ri'

import {User} from '@/database/models/User.model'
import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'

interface Props {
  user: Partial<User>
}

export default function UserDropdownMenuContent({user}: Props) {
  const router = useRouter()

  return (
    <>
      <DropdownMenuLabel>
        <span className="text-primary font-bold mr-1">@</span>
        {user.name}
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
