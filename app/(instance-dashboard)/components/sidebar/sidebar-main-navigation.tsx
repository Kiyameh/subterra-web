'use client'
import Link from 'next/link'
import {Session} from 'next-auth'
import {PopulatedInstance} from '@/database/models/Instance.model'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

import {ChevronRight} from 'lucide-react'
import {PiCircleBold} from 'react-icons/pi'
import {TbCircles} from 'react-icons/tb'
import {MdOutlineExplore} from 'react-icons/md'
import {GrUserAdmin} from 'react-icons/gr'
import {RiApps2AddLine} from 'react-icons/ri'
import {LuPlusCircle} from 'react-icons/lu'
import {GrChapterAdd} from 'react-icons/gr'

interface Props {
  currentInstance: PopulatedInstance | null
  user: Session['user'] | null
}

/**
 * Panel de navegación principal de instancias para colocar en un sidebar
 * @param currentInstance - Instancia actual <PopulatedInstance>
 * @param user - Usuario actual <Session['user']>
 */
export default function SidebarMainNavigation({currentInstance, user}: Props) {
  let isEditor = false
  let isAdmin = false
  const userId = user?._id
  if (userId && currentInstance) {
    currentInstance.editors.map((editor) => {
      if (editor._id === userId) {
        isEditor = true
      }
    })
    isAdmin = currentInstance.admin._id === userId
  }

  return (
    <>
      {currentInstance && (
        <SidebarGroup>
          <SidebarGroupLabel>Instancia</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Cavidades">
                    {<PiCircleBold />}
                    <span>{'Cavidades'}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href={`${currentInstance.name}/list/caves`}>
                          <span>Listado completo</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href={`${currentInstance.name}/details`}>
                          <span>Busqueda avanzada</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {isEditor && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`${currentInstance.name}/create/cave`}>
                            <span className="text-red-700">
                              <LuPlusCircle />
                            </span>
                            <span>Nueva cavidad</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <Collapsible
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Sistemas">
                    {<TbCircles />}
                    <span>{'Sistemas'}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href={`${currentInstance.name}/list/systems`}>
                          <span>Listado completo</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href={`${currentInstance.name}/details`}>
                          <span>Busqueda avanzada</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {isEditor && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`${currentInstance.name}/create/system`}>
                            <span className="text-red-700">
                              <RiApps2AddLine />
                            </span>

                            <span>Nuevo sistema</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <Collapsible
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Exploraciones">
                    {<MdOutlineExplore />}
                    <span>{'Exploraciones'}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={`${currentInstance.name}/list/explorations`}
                        >
                          <span>Ultimas exploraciones</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href={`${currentInstance.name}/details`}>
                          <span>Busqueda avanzada</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {isEditor && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={`${currentInstance.name}/create/exploration`}
                          >
                            <span className="text-red-700">
                              <GrChapterAdd />
                            </span>

                            <span>Nuevo informe</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      )}
      {currentInstance && isAdmin && (
        <SidebarGroup>
          <SidebarGroupLabel>Área administración</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`${currentInstance.name}/admin`}>
                  <span className="text-purple-600">
                    <GrUserAdmin />
                  </span>
                  <span>Administrar instancia</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  )
}
