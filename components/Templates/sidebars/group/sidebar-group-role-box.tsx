'use client'
import React from 'react'
import {useSession} from 'next-auth/react'
import {useParams} from 'next/navigation'

import {getGroupId} from '@/database/services/Group/getGroupId'
import {checkIsMember} from '@/database/services/Group/membership/checkIsMember'
import {checkIsAdmin} from '@/database/services/Group/membership/checkIsAdmin'

import {SidebarGroup, useDualSidebar} from '@/components/Atoms/dual-sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Atoms/dropdown-menu'
import {AdminBadge, EditorBadge} from '@/components/Molecules/slots/user-slots'
import ResignAdminDialog from '@/components/Templates/groups/group-dialogs/resign-admin-dialog'
import ResignMemberDialog from '@/components/Templates/groups/group-dialogs/resign-member-dialog'

import {IoClose} from 'react-icons/io5'
import {FaGear} from 'react-icons/fa6'

/**
 * @version 2
 * @description Componente para sidebar de grupo que indica el rol del usuario
 */

export default function SidebarGroupRoleBox() {
  // Obtener el usuario
  const {data: session} = useSession()
  const userId = session?.user?._id

  // Obtener el nombre del grupo
  const params = useParams()
  const groupName = params.group as string

  // Control del sidebar
  const {isMobile, toggleLeftSidebar, leftOpen} = useDualSidebar()

  // Control de los dialogos de renuncia
  const [resignMemberOpen, setResignMemberOpen] = React.useState(false)
  const [resignAdminOpen, setResignAdminOpen] = React.useState(false)

  // Fetch del grupo y de los roles
  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [isMember, setIsMember] = React.useState<boolean>(false)
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchGroup = async () => {
      const groupId = await getGroupId(groupName)
      const isMember = await checkIsMember(userId, groupName)
      const isAdmin = await checkIsAdmin(userId, groupName)
      setGroupId(groupId)
      setIsMember(isMember)
      setIsAdmin(isAdmin)
    }
    fetchGroup()
  }, [groupId, userId, groupName])

  if (!userId || !groupId) return null

  return (
    <>
      <SidebarGroup className="flex flex-row gap-2">
        {isMember && leftOpen && (
          <EditorBadge
            label="Miembro"
            helperText="Eres miembro de este grupo"
          />
        )}
        {isAdmin && leftOpen && (
          <AdminBadge
            label="Admin"
            helperText="Eres administrador de este grupo"
          />
        )}
        {(isMember || isAdmin) && leftOpen && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaGear className="text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isMember && (
                <DropdownMenuItem
                  onClick={() => {
                    setResignMemberOpen(true)
                    if (isMobile) toggleLeftSidebar()
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
                    if (isMobile) toggleLeftSidebar()
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
