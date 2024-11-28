'use client'
import * as React from 'react'

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

// Icons
import {LuChevronsUpDown} from 'react-icons/lu'
import {LuBox} from 'react-icons/lu'

import Link from 'next/link'
import OnlineIndicator from '@/components/displaying/online-indicator'
import {PopulatedInstance} from '@/database/models/Instance.model'

interface Props {
  allInstances: PopulatedInstance[] | null
  currentInstance: PopulatedInstance | null
}

/**
 * Panel de selección de instancias para colocar en un Sidebar
 * @param allInstances - Lista de instancias <PopulatedInstance[]>
 * @param currentInstance - Instancia actual <PopulatedInstance>
 */

export default function SidebarInstanceSelector({
  allInstances,
  currentInstance,
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
                <LuBox />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentInstance
                    ? currentInstance.fullname
                    : 'Selecciona una instancia'}
                </span>
                <span className="truncate text-xs">
                  {currentInstance && currentInstance.territory}
                </span>
              </div>
              <LuChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Instancias
            </DropdownMenuLabel>
            {allInstances &&
              allInstances.map((item, index) => (
                <Link
                  key={index}
                  href={item.is_online ? `/instance/${item.name}` : '#'}
                >
                  <DropdownMenuItem className="cursor-pointer flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <OnlineIndicator isOnline={item.is_online} />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {item.territory}
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
