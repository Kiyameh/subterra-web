'use client'
import React from 'react'

import {SidebarGroup, useSidebar} from '@/components/Atoms/sidebar'
import {AdminBadge, EditorBadge} from '@/components/Molecules/slots/user-slots'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Atoms/dropdown-menu'

import {IoClose} from 'react-icons/io5'
import {FaGear} from 'react-icons/fa6'
import ResignAdminDialog from '@/components/Templates/groups/group-dialogs/resign-admin-dialog'
import ResignMemberDialog from '@/components/Templates/groups/group-dialogs/resign-member-dialog'

/**
 * @version 1
 * @description Componente para sidebar de grupo que indica el rol del usuario
 * @param isMember
 * @param isAdmin
 * @param groupId Id del grupo
 * @param userId Id del usuario
 */

export default function SidebarGroupRoleBox({
  isMember,
  isAdmin,
  groupId,
  userId,
}: {
  isMember: boolean
  isAdmin: boolean
  groupId: string | undefined
  userId: string | undefined
}) {
  const isOpen = useSidebar().open

  const {isMobile, toggleSidebar} = useSidebar()

  const [resignMemberOpen, setResignMemberOpen] = React.useState(false)
  const [resignAdminOpen, setResignAdminOpen] = React.useState(false)

  if (!userId || !groupId) return null

  return (
    <>
      <SidebarGroup className="flex flex-row gap-2">
        {isMember && isOpen && (
          <EditorBadge
            label="Miembro"
            helperText="Eres miembro de este grupo"
          />
        )}
        {isAdmin && isOpen && (
          <AdminBadge
            label="Admin"
            helperText="Eres administrador de este grupo"
          />
        )}
        {(isMember || isAdmin) && isOpen && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaGear className="text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isMember && (
                <DropdownMenuItem
                  onClick={() => {
                    setResignMemberOpen(true)
                    if (isMobile) toggleSidebar()
                  }}
                >
                  <IoClose />
                  Renunciar como miembro
                </DropdownMenuItem>
              )}
              {isAdmin && (
                <DropdownMenuItem
                  onClick={() => {
                    setResignAdminOpen(true)
                    if (isMobile) toggleSidebar()
                  }}
                >
                  <IoClose />
                  Renunciar como administrador
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ResignMemberDialog
          groupId={groupId}
          userId={userId}
          isOpen={resignMemberOpen}
          onOpenChange={setResignMemberOpen}
        />
        <ResignAdminDialog
          groupId={groupId}
          userId={userId}
          isOpen={resignAdminOpen}
          onOpenChange={setResignAdminOpen}
        />
      </SidebarGroup>
    </>
  )
}
