'use client'
import Link from 'next/link'
import {useParams, usePathname} from 'next/navigation'

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
import {FaGear} from 'react-icons/fa6'
import {RiApps2AddLine} from 'react-icons/ri'
import {LuPlusCircle} from 'react-icons/lu'
import {GrChapterAdd} from 'react-icons/gr'
import {FaUserEdit} from 'react-icons/fa'

interface Props {
  isEditor: boolean
  isCoordinator: boolean
}

/**
 * Panel de navegación principal de instancias para colocar en un sidebar
 * @param isEditor Si el usuario es editor
 * @param isCoordinator Si el usuario es administrador
 */
export default function SidebarInstanceNavigation({
  isEditor,
  isCoordinator,
}: Props) {
  const {instance} = useParams()
  const pathName = usePathname()

  return (
    <>
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
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathName.includes('/list/caves')}
                    >
                      <Link href={`/instance/${instance}/list/caves`}>
                        <span>Listado completo</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  {isEditor && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathName.includes('/create/cave')}
                      >
                        <Link href={`/instance/${instance}/create/cave`}>
                          <span className="text-editor">
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
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathName.includes('/list/systems')}
                    >
                      <Link href={`/instance/${instance}/list/systems`}>
                        <span>Listado completo</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  {isEditor && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathName.includes('/create/system')}
                      >
                        <Link href={`/instance/${instance}/create/system`}>
                          <span className="text-editor">
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
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathName.includes('/list/explorations')}
                    >
                      <Link href={`/instance/${instance}/list/explorations`}>
                        <span>Ultimas exploraciones</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  {isEditor && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathName.includes('/create/exploration')}
                      >
                        <Link href={`/instance/${instance}/create/exploration`}>
                          <span className="text-editor">
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
      {isCoordinator && (
        <SidebarGroup>
          <SidebarGroupLabel>Área administración</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Lista de editores"
              >
                <Link href={`/instance/${instance}/editors`}>
                  <span className="text-editor">
                    <FaUserEdit />
                  </span>
                  <span>Lista de editores</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Editar instancia"
              >
                <Link href={`/instance/${instance}/admin`}>
                  <span className="text-admin">
                    <FaGear />
                  </span>
                  <span>Editar instancia</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  )
}
