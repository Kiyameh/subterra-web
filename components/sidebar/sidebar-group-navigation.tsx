'use client'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import {Session} from 'next-auth'
import {IoMdInformationCircleOutline} from 'react-icons/io'
import {FaUserGroup} from 'react-icons/fa6'
import {GrConfigure} from 'react-icons/gr'
import {PopulatedGroup} from '@/database/models/Group.model'

interface Props {
  currentGroup: PopulatedGroup | null
  user: Session['user'] | null
}

/**
 * Panel de navegación principal de grupos para colocar en un sidebar
 * @param currentGroup - Grupo actual <PopulatedGroup>
 * @param user - Usuario actual <Session['user']>
 * @returns
 */

export default function SidebarGroupNavigation({currentGroup, user}: Props) {
  let isMember = false
  let isAdmin = false
  const userId = user?._id

  if (userId && currentGroup) {
    isMember = (currentGroup.members as unknown as string[]).includes(userId)
    isAdmin = (currentGroup.admin as unknown as string) === userId
  }

  return (
    <>
      {currentGroup && (
        <SidebarGroup>
          <SidebarGroupLabel>Área pública</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href={`/group/${currentGroup.name}`}>
                <SidebarMenuButton>
                  <IoMdInformationCircleOutline />
                  <span>Página de presentación</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}
      {currentGroup && isMember && (
        <SidebarGroup>
          <SidebarGroupLabel>Área miembros</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href={`/group/${currentGroup.name}/members`}>
                <SidebarMenuButton>
                  <span className="text-primary">
                    <FaUserGroup />
                  </span>
                  Miembros
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            {isAdmin && (
              <SidebarMenuItem>
                <Link href={`/group/${currentGroup.name}/edit`}>
                  <SidebarMenuButton>
                    <span className="text-purple-700">
                      <GrConfigure />
                    </span>
                    Panel de administración
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  )
}

/* 


*/
