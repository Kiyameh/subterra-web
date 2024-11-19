'use client'
import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
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

interface AccountMenuProps {
  user: User
}

export default function AccountMenu({user}: AccountMenuProps) {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer"
      >
        <Avatar>
          {user?.avatar && (
            <AvatarImage
              src={user?.avatar}
              alt="avatar"
            />
          )}
          <AvatarFallback className="bg-primary">
            {user?.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`@${name}`}</DropdownMenuLabel>
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
