import React from 'react'
import {Session} from 'next-auth'

import {Badge} from '@/components/Atoms/badge'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/Atoms/avatar'
import ResponsiveTooltip from '@/components/Molecules/badges/responsive-tooltip'

/**
 * @version 1
 * @description Tarjeta de perfil de usuario
 * @param user usuario
 */

export function UserProfileCard({user}: {user: Session['user']}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-muted-foreground">
      <Avatar>
        {user?.image && (
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

/**
 * @version 1
 * @description Badge para indicar que el usuario es administrador
 * @param label Texto del Badge
 * @param helperText Texto del tooltip
 * @default
 * label: 'Admin'
 * helperText: 'Eres administrador'
 */
export function AdminBadge({
  label = 'Admin',
  helperText = 'Eres administrador',
}: {
  label?: string
  helperText?: string
}) {
  return (
    <ResponsiveTooltip content={helperText}>
      <Badge className="w-fit cursor-help border-2 border-admin/70 bg-sidebar text-admin/70 hover:bg-card">
        {label}
      </Badge>
    </ResponsiveTooltip>
  )
}

/**
 * @version 1
 * @description Badge para indicar que el usuario es editor
 * @param label Texto del Badge
 * @param helperText Texto del tooltip
 * @default
 * label: 'Editor'
 * helperText: 'Eres editor'
 */

export function EditorBadge({
  label = 'Editor',
  helperText = 'Eres editor',
}: {
  label?: string
  helperText?: string
}) {
  return (
    <ResponsiveTooltip content={helperText}>
      <Badge className="w-fit cursor-help border-2 border-editor/70 bg-sidebar text-editor/70 hover:bg-card">
        {label}
      </Badge>
    </ResponsiveTooltip>
  )
}
