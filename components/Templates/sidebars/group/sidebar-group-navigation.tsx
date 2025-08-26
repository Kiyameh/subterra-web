'use client'
import React from 'react'
import Link from 'next/link'
import {useSession} from 'next-auth/react'
import {useParams, usePathname} from 'next/navigation'
import {checkIsMember} from '@/database/services/Group/membership/checkIsMember'
import {checkIsAdmin} from '@/database/services/Group/membership/checkIsAdmin'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useDualSidebar,
} from '@/components/Atoms/dual-sidebar'
import {IoMdInformationCircleOutline} from 'react-icons/io'
import {FaUserGroup} from 'react-icons/fa6'
import {FaGear} from 'react-icons/fa6'
import {FiBox} from 'react-icons/fi'

/**
 * @version 2
 * @description Panel de navegación principal de grupos para colocar en un sidebar
 */

export default function SidebarGroupNavigation() {
  // Obtener el usuario
  const {data: session} = useSession()
  const userId = session?.user?._id

  // Obtener el grupo
  const params = useParams()
  const groupName = params.group as string

  // Fetch de la instancia y de los roles
  const [isMember, setIsMember] = React.useState<boolean>(false)
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchInstance = async () => {
      const isMember = await checkIsMember(userId, groupName)
      const isAdmin = await checkIsAdmin(userId, groupName)
      setIsMember(isMember)
      setIsAdmin(isAdmin)
    }
    fetchInstance()
  }, [userId, groupName])

  const pathName = usePathname()
  const {isMobile, toggleLeftSidebar} = useDualSidebar()

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Área pública</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={() => {
                if (isMobile) toggleLeftSidebar()
              }}
            >
              <Link href={`/group/${groupName}`}>
                <IoMdInformationCircleOutline />
                <span>Página de presentación</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      {isMember && (
        <SidebarGroup>
          <SidebarGroupLabel>Área privada</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathName.includes(`${groupName}/members`)}
                onClick={() => {
                  if (isMobile) toggleLeftSidebar()
                }}
              >
                <Link href={`/group/${groupName}/members`}>
                  <FaUserGroup className="text-editor" />
                  <span>Miembros del grupo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathName.includes(`${groupName}/instances`)}
                onClick={() => {
                  if (isMobile) toggleLeftSidebar()
                }}
              >
                <Link href={`/group/${groupName}/instances`}>
                  <FiBox className="text-editor" />
                  <span>Instancias del grupo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isAdmin && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName.includes(`${groupName}/admin`)}
                  onClick={() => {
                    if (isMobile) toggleLeftSidebar()
                  }}
                >
                  <Link href={`/group/${groupName}/admin`}>
                    <FaGear className="text-admin" />
                    <span>Editar grupo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  )
}
