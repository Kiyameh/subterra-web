'use client'
import React from 'react'
import {SidebarGroup, useSidebar} from '@/components/ui/sidebar'
import {AdminBadge, EditorBadge} from '../../_Atoms/slots/user-slots'

/**
 * @version 1
 * @description Componente para sidebar que indica el rol del usuario
 * @param isEditor
 * @param isAdmin
 * @param editorTag default: 'Editor'
 * @param adminTag default: 'Admin'
 * @param editorText default: 'Eres editor de esta instancia'
 * @param adminText default: 'Eres administrador de esta instancia'
 */

export default function SidebarRoleIndicator({
  isEditor,
  isAdmin,
  editorTag = 'Editor',
  adminTag = 'Admin',
  editorText = 'Eres editor de esta instancia',
  adminText = 'Eres administrador de esta instancia',
}: {
  isEditor: boolean
  isAdmin: boolean
  editorTag?: string
  adminTag?: string
  editorText?: string
  adminText?: string
}) {
  const isOpen = useSidebar().open
  return (
    <SidebarGroup className="flex flex-row gap-2">
      {isEditor && isOpen && (
        <EditorBadge
          label={editorTag}
          helperText={editorText}
        />
      )}
      {isAdmin && isOpen && (
        <AdminBadge
          label={adminTag}
          helperText={adminText}
        />
      )}
    </SidebarGroup>
  )
}
