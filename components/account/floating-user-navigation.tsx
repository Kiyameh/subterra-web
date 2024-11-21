'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import AvatarButton from './avatar-button'
import UserDropdownMenuContent from '@/components/account/user-dropdown-menu-content'
import {Session} from 'next-auth'

interface Props {
  user: Session['user']
}

export default function FloatingUserNavigation({user}: Props) {
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
