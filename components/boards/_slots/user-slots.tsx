import ResponsiveTooltip from '@/components/displaying/responsive-tooltip'
import {Badge} from '@/components/ui/badge'
import React from 'react'

/**
 * @version 1
 * @description Badge para indicar que el usuario es administrador
 * @param label default: 'Admin'
 * @param helperText default: 'Eres administrador'
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
 * @param label default: 'Editor'
 * @param helperText default: 'Eres editor'
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
