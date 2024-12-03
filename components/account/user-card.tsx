import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar'
import {Session} from 'next-auth'

export default function UserCard({user}: {user: Session['user']}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-muted-foreground">
      <Avatar>
        {user.image && (
          <AvatarImage
            src={user.image}
            alt="Avatar"
          />
        )}
        <AvatarFallback className="bg-primary">
          {user.name?.slice(0, 2).toUpperCase() || 'US'}
        </AvatarFallback>
      </Avatar>
      <div className="text-muted-foreground">
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm">{user.email}</p>
      </div>
    </div>
  )
}
