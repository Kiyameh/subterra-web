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
import {Group} from '@/database/models/Group.model'
import {FaUserGroup} from 'react-icons/fa6'
import {GrConfigure} from 'react-icons/gr'

interface Props {
  currentGroup: Group | undefined
  user: Session['user'] | undefined
}

export default function SidebarMainNavigation({currentGroup, user}: Props) {
  const userId = user?._id
  let isMember = false
  let isAdmin = false

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
                  <FaUserGroup />
                  Miembros
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            {isAdmin && (
              <SidebarMenuItem>
                <Link href={`/group/${currentGroup.name}/edit`}>
                  <SidebarMenuButton>
                    <GrConfigure />
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
