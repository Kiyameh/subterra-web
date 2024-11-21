'use client'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Session} from 'next-auth'

interface Props {
  user: Session['user']
  onClick?: () => void
}
export default function AvatarButton({user, onClick}: Props) {
  const image = user.image || null
  const name = user.name || 'US'

  return (
    <Avatar
      className="cursor-pointer"
      onClick={onClick}
    >
      {image && (
        <AvatarImage
          src={image}
          alt="Avatar"
        />
      )}
      <AvatarFallback className="bg-primary">
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
