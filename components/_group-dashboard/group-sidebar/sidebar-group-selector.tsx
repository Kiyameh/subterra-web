'use client'
import * as React from 'react'
import Link from 'next/link'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {LuChevronsUpDown} from 'react-icons/lu'
import {FaUserGroup} from 'react-icons/fa6'
import {MdNavigateNext} from 'react-icons/md'

import {GroupIndex} from '@/database/services/group.actions'
import {Button} from '../../ui/button'

/**
 * @version 1
 * @description Panel de selección de grupo para colocar en un Sidebar
 * @param groupsIndex - Lista de grupos <GroupWithUsers[]>
 * @param currentGroupIndex - Grupo actual <GroupWithUsers>
 */

export default function SidebarGroupSelector({
  groupsIndex,
  currentGroupIndex,
}: {
  groupsIndex: GroupIndex[] | null
  currentGroupIndex: GroupIndex | null
}) {
  const {isMobile, toggleSidebar} = useSidebar()

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
                  {currentGroupIndex
                    ? currentGroupIndex.fullname
                    : 'Selecciona un grupo'}
                </span>
                <span className="truncate text-xs">
                  {currentGroupIndex && currentGroupIndex.province}
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
            {groupsIndex &&
              groupsIndex.map((item, index) => (
                <Link
                  key={index}
                  href={`/group/${item.name}`}
                  onClick={() => {
                    if (isMobile) toggleSidebar()
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
