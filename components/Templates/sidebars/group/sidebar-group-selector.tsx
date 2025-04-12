'use client'
import React from 'react'
import Link from 'next/link'
import {useParams} from 'next/navigation'

import {GroupIndex} from '@/database/services/Group/getGroupsIndex'
import {getGroupsIndex} from '@/database/services/Group/getGroupsIndex'

import {Button} from '@/components/Atoms/button'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useDualSidebar,
} from '@/components/Atoms/dual-sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/Atoms/dropdown-menu'

import {LuChevronsUpDown} from 'react-icons/lu'
import {FaUserGroup} from 'react-icons/fa6'
import {MdNavigateNext} from 'react-icons/md'

/**
 * @version 2
 * @description Panel de selección de grupo para colocar en un Sidebar
 */

export default function SidebarGroupSelector() {
  // Obtener el nombre del grupo
  const params = useParams()
  const groupName = params.group as string

  const [group, setGroup] = React.useState<GroupIndex | null>(null)
  const [allGroups, setAllGroups] = React.useState<GroupIndex[] | null>(null)

  React.useEffect(() => {
    const fetchGroups = async () => {
      // Obtener índice de grupos de la base de datos:
      const allGroups = (await getGroupsIndex()).content as GroupIndex[] | null
      setAllGroups(allGroups)

      // Obtener el grupo actual:
      const currentGroup = allGroups?.find(
        (group) => group.name === groupName
      ) as GroupIndex | null
      setGroup(currentGroup)
    }
    fetchGroups()
  }, [groupName])

  const {isMobile, toggleLeftSidebar} = useDualSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                <FaUserGroup />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {group ? group.fullname : 'Selecciona un grupo'}
                </span>
                <span className="truncate text-xs">
                  {group && group.province}
                </span>
              </div>
              <LuChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-80 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 p-2 px-5 rounded-md bg-secondary text-secondary-foreground">
                  Grupos
                </div>
                <Link href="/instance">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-sm"
                  >
                    <span className="text-xs">Instancias</span>
                    <MdNavigateNext />
                  </Button>
                </Link>
              </div>
            </DropdownMenuLabel>
            {allGroups &&
              allGroups.map((item, index) => (
                <Link
                  key={index}
                  href={`/group/${item.name}`}
                  onClick={() => {
                    if (isMobile) toggleLeftSidebar()
                  }}
                >
                  <DropdownMenuItem className="cursor-pointer flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <FaUserGroup className="text-primary" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {item.province}
                    </span>
                  </DropdownMenuItem>
                </Link>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
