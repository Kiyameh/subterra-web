'use client'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {User} from '@/database/models/User.model'

interface AvatarProps {
  user: User
  onClick?: () => void
}
export default function AvatarButton({user, onClick}: AvatarProps) {
  const image = user.avatar || null
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
