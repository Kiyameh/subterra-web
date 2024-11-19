'use client'
import React from 'react'
import {User} from '@/database/models/User.model'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {DropdownMenuLabel} from '@/components/ui/dropdown-menu'
import {MdSettings} from 'react-icons/md'
import {BsFilePersonFill} from 'react-icons/bs'
import {RiEyeCloseLine} from 'react-icons/ri'
import {signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import AvatarButton from './avatar-button'

interface AccountMenuProps {
  user: User
}

export default function AccountMenu({user}: AccountMenuProps) {
  const router = useRouter()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <AvatarButton user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-3">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
