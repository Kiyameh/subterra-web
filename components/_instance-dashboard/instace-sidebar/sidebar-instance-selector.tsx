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

import {LuChevronsUpDown} from 'react-icons/lu'
import {LuBox} from 'react-icons/lu'
import {InstanceWithOwner} from '@/database/services/Instance/getAllInstances'

import Link from 'next/link'
import OnlineIndicator from '@/components/_Atoms/badges/online-indicator'
import {Button} from '../../ui/button'
import {MdNavigateNext} from 'react-icons/md'

import {GrLock} from 'react-icons/gr'
import ResponsiveTooltip from '@/components/_Atoms/badges/responsive-tooltip'

/**
 * @version 1
 * @description Panel de selección de instancias para colocar en un Sidebar
 * @param allInstances - Lista de instancias <InstanceWithOwner[]>
 * @param currentInstance - Instancia actual
 */

export default function SidebarInstanceSelector({
  allInstances,
  currentInstance,
}: {
  allInstances: InstanceWithOwner[] | null
  currentInstance: InstanceWithOwner | null
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
            className="w-auto min-w-80 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 p-2 px-5 rounded-md bg-secondary text-secondary-foreground">
                  Instancias
                </div>

                <Link href="/group">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-sm"
                  >
                    <span className="text-xs">Grupos</span>
                    <MdNavigateNext />
                  </Button>
                </Link>
              </div>
            </DropdownMenuLabel>
            {allInstances &&
              allInstances.map((item, index) => (
                <Link
                  key={index}
                  href={item.is_online ? `/instance/${item.name}` : '#'}
                  onClick={() => {
                    if (isMobile) toggleSidebar()
                  }}
                >
                  <DropdownMenuItem className="cursor-pointer flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        {item.public_visibility ? (
                          <OnlineIndicator
                            isOnline={item.is_online}
                            onlineText="Instancia pública"
                          />
                        ) : (
                          <ResponsiveTooltip
                            color="warning"
                            content="Instancia privada"
                          >
                            <GrLock className="text-destructive-foreground" />
                          </ResponsiveTooltip>
                        )}
                      </div>
                      <div>
                        <p>{item.fullname}</p>
                        <p className="text-muted-foreground text-sm">
                          {item.owner.fullname}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {item.territory}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </Link>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
