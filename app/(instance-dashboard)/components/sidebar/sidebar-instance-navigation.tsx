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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Icons
import {LuChevronsUpDown} from 'react-icons/lu'
import {MdOutlineMap} from 'react-icons/md'
import {LuBox} from 'react-icons/lu'

import {usePathname} from 'next/navigation'
import {Instance} from '@/database/models/Instance.model'
import Link from 'next/link'

interface Props {
  instances: Instance[]
}

/**
 * Panel de navegación de instancias para colocar en un Sidebar
 * @param {{name: string, territory: string}[]} instances - Lista de instancias
 *
 */
export default function SidebarInstanceNavigation({instances}: Props) {
  // Obtener instancia actual:
  const instanceName = usePathname().split('/').pop()
  const [currentInstance, setCurrentInstance] = React.useState<
    Partial<Instance>
  >({
    name: '',
    territory: '',
  })

  React.useEffect(() => {
    instances.find((instance) => {
      if (instance.name === instanceName) {
        setCurrentInstance(instance)
      }
    })
  }, [instanceName, instances])

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
                  {currentInstance.name}
                </span>
                <span className="truncate text-xs">
                  {currentInstance.territory}
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
            {instances.map((item, index) => (
              <Link
                key={index}
                href={`/instance/${item.name}`}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <MdOutlineMap className="size-4" />
                  </div>
                  {item.name}
                  <DropdownMenuShortcut>{item.territory}</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
