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

import {GroupIndex} from '@/database/models/Group.model'

interface Props {
  groupsIndex: GroupIndex[] | null
  currentGroupIndex: GroupIndex | null
}

/**
 * Panel de selección de grupo para colocar en un Sidebar
 * @param groupsIndex - Lista de grupos <PopulatedGroup[]>
 * @param currentGroupIndex - Grupo actual <PopulatedGroup>
 */

export default function SidebarGroupSelector({
  groupsIndex,
  currentGroupIndex,
}: Props) {
  const {isMobile} = useSidebar()

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
              Grupos
            </DropdownMenuLabel>
            {groupsIndex &&
              groupsIndex.map((item, index) => (
                <Link
                  key={index}
                  href={`/group/${item.name}`}
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
