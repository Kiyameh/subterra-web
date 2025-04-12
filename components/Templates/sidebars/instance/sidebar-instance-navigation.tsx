'use client'
import Link from 'next/link'
import {useParams, usePathname} from 'next/navigation'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/Atoms/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useDualSidebar,
} from '@/components/Atoms/dual-sidebar'

import {ChevronRight} from 'lucide-react'
import {PiCircleBold} from 'react-icons/pi'
import {TbCircles} from 'react-icons/tb'
import {MdOutlineExplore} from 'react-icons/md'
import {FaGear} from 'react-icons/fa6'
import {RiApps2AddLine} from 'react-icons/ri'
import {LuPlusCircle} from 'react-icons/lu'
import {GrChapterAdd} from 'react-icons/gr'
import {FaUserEdit} from 'react-icons/fa'
import {IoMdInformationCircleOutline} from 'react-icons/io'
import {useSession} from 'next-auth/react'
import React from 'react'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'
import {checkIsCoordinator} from '@/database/services/Instance/membership/checkIsCoordinator'

/**
 * @version 2
 * @description Panel de navegación principal de instancias para colocar en un sidebar
 */

export default function SidebarInstanceNavigation() {
  // Obtener el usuario
  const {data: session} = useSession()
  const userId = session?.user?._id
  // Obtener nombre de la instancia
  const params = useParams()
  const instanceName = params.instance as string

  // Fetch de la instancia y de los roles
  const [isEditor, setIsEditor] = React.useState<boolean>(false)
  const [isCoordinator, setIsCoordinator] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchInstance = async () => {
      const isEditor = await checkIsEditor(userId, instanceName)
      const isCoordinator = await checkIsCoordinator(userId, instanceName)
      setIsEditor(isEditor)
      setIsCoordinator(isCoordinator)
    }
    fetchInstance()
  }, [userId, instanceName])

  const pathName = usePathname()
  const {isMobile, toggleLeftSidebar} = useDualSidebar()

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Instancia</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/instance/${instanceName}`}>
                <IoMdInformationCircleOutline />
                <span>Página de presentación</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
                      isActive={pathName.includes('/caves/list')}
                      onClick={() => {
                        if (isMobile) toggleLeftSidebar()
                      }}
                    >
                      <Link href={`/instance/${instanceName}/caves/list`}>
                        <span>Listado completo</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  {isEditor && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathName.includes('/caves/create')}
                        onClick={() => {
                          if (isMobile) toggleLeftSidebar()
                        }}
                      >
                        <Link href={`/instance/${instanceName}/caves/create`}>
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
                      isActive={pathName.includes('/systems/list')}
                      onClick={() => {
                        if (isMobile) toggleLeftSidebar()
                      }}
                    >
                      <Link href={`/instance/${instanceName}/systems/list`}>
                        <span>Listado completo</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  {isEditor && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathName.includes('/systems/create')}
                        onClick={() => {
                          if (isMobile) toggleLeftSidebar()
                        }}
                      >
                        <Link href={`/instance/${instanceName}/systems/create`}>
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
                      isActive={pathName.includes('/explorations/list')}
                      onClick={() => {
                        if (isMobile) toggleLeftSidebar()
                      }}
                    >
                      <Link
                        href={`/instance/${instanceName}/explorations/list`}
                      >
                        <span>Últimas exploraciones</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  {isEditor && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathName.includes('/explorations/create')}
                        onClick={() => {
                          if (isMobile) toggleLeftSidebar()
                        }}
                      >
                        <Link
                          href={`/instance/${instanceName}/explorations/create`}
                        >
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
      {isEditor && (
        <SidebarGroup>
          <SidebarGroupLabel>Área administración</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Lista de editores"
                onClick={() => {
                  if (isMobile) toggleLeftSidebar()
                }}
              >
                <Link href={`/instance/${instanceName}/editors`}>
                  <span className="text-editor">
                    <FaUserEdit />
                  </span>
                  <span>Lista de editores</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isCoordinator && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Editar instancia"
                  onClick={() => {
                    if (isMobile) toggleLeftSidebar()
                  }}
                >
                  <Link href={`/instance/${instanceName}/admin`}>
                    <span className="text-admin">
                      <FaGear />
                    </span>
                    <span>Editar instancia</span>
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
