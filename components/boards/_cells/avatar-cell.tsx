import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import React from 'react'

export default async function AvatarCell({src}: {src: string}) {
  'use server'
  return (
    <Avatar>
      <AvatarImage
        src={src}
        alt="src"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
