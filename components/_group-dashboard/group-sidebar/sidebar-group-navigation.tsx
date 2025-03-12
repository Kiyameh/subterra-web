'use client'
import Link from 'next/link'
import {useParams, usePathname} from 'next/navigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {IoMdInformationCircleOutline} from 'react-icons/io'
import {FaUserGroup} from 'react-icons/fa6'
import {FaGear} from 'react-icons/fa6'
import {FiBox} from 'react-icons/fi'

/**
 * @version 1
 * @description Panel de navegación principal de grupos para colocar en un sidebar
 * @param isMember - Si el usuario es miembro
 * @param isAdmin - Si el usuario es administrador
 */

export default function SidebarGroupNavigation({
  isMember,
  isAdmin,
}: {
  isMember: boolean
  isAdmin: boolean
}) {
  const {group} = useParams()
  const pathName = usePathname()
  const {isMobile, toggleSidebar} = useSidebar()

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Área pública</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={() => {
                if (isMobile) toggleSidebar()
              }}
            >
              <Link href={`/group/${group}`}>
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
                isActive={pathName.includes(`${group}/members`)}
                onClick={() => {
                  if (isMobile) toggleSidebar()
                }}
              >
                <Link href={`/group/${group}/members`}>
                  <FaUserGroup className="text-editor" />
                  <span>Miembros del grupo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathName.includes(`${group}/instances`)}
                onClick={() => {
                  if (isMobile) toggleSidebar()
                }}
              >
                <Link href={`/group/${group}/instances`}>
                  <FiBox className="text-editor" />
                  <span>Instancias del grupo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isAdmin && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName.includes(`${group}/admin`)}
                  onClick={() => {
                    if (isMobile) toggleSidebar()
                  }}
                >
                  <Link href={`/group/${group}/admin`}>
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
