'use client'
import React from 'react'
import {useSession} from 'next-auth/react'
import {useParams} from 'next/navigation'

import {getInstanceId} from '@/database/services/Instance/getInstanceId'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'
import {checkIsCoordinator} from '@/database/services/Instance/membership/checkIsCoordinator'

import {useDualSidebar, SidebarGroup} from '@/components/Atoms/dual-sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Atoms/dropdown-menu'

import {AdminBadge, EditorBadge} from '@/components/Molecules/slots/user-slots'
import ResignEditorDialog from '@/components/Templates/instances/instance-dialogs/resign-editor-dialog'
import ResignCoordinatorDialog from '@/components/Templates/instances/instance-dialogs/resign-coordinator-dialog'

import {FaGear} from 'react-icons/fa6'
import {IoClose} from 'react-icons/io5'

/**
 * @version 2
 * @description Componente para sidebar de instancia que indica el rol del usuario
 */

export default function SidebarInstanceRoleBox() {
  // Obtener el usuario
  const {data: session} = useSession()
  const userId = session?.user?._id

  // Obtener nombre de la instancia
  const params = useParams()
  const instanceName = params.instance as string

  // Control del sidebar
  const {isMobile, toggleLeftSidebar, leftOpen} = useDualSidebar()

  // Control de los dialogos de renuncia
  const [resignEditorOpen, setResignEditorOpen] = React.useState(false)
  const [resignCoordinatorOpen, setResignCoordinatorOpen] =
    React.useState(false)

  // Fetch de la instancia y de los roles
  const [instanceId, setInstanceId] = React.useState<string | null>(null)
  const [isEditor, setIsEditor] = React.useState<boolean>(false)
  const [isCoordinator, setIsCoordinator] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchInstance = async () => {
      const instanceId = await getInstanceId(instanceName as string)
      const isEditor = await checkIsEditor(userId, instanceName)
      const isCoordinator = await checkIsCoordinator(userId, instanceName)
      setInstanceId(instanceId)
      setIsEditor(isEditor)
      setIsCoordinator(isCoordinator)
    }
    fetchInstance()
  }, [instanceId, userId, instanceName])

  if (!userId || !instanceId) return null

  return (
    <>
      <SidebarGroup className="flex flex-row items-center gap-2">
        {isEditor && leftOpen && (
          <EditorBadge
            label="Editor"
            helperText="Eres editor de esta instancia"
          />
        )}
        {isCoordinator && leftOpen && (
          <AdminBadge
            label="Coordinador"
            helperText="Eres coordinador de esta instancia"
          />
        )}
        {(isEditor || isCoordinator) && leftOpen && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaGear className="text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setResignEditorOpen(true)
                  if (isMobile) toggleLeftSidebar()
                }}
              >
                <IoClose />
                Renunciar como editor
              </DropdownMenuItem>
              {isCoordinator && (
                <DropdownMenuItem
                  onClick={() => {
                    setResignCoordinatorOpen(true)
                    if (isMobile) toggleLeftSidebar()
                  }}
                >
                  <IoClose />
                  Renunciar como coordinador
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarGroup>
      <ResignEditorDialog
        instanceId={instanceId}
        userId={userId}
        isOpen={resignEditorOpen}
        onOpenChange={setResignEditorOpen}
      />
      <ResignCoordinatorDialog
        instanceId={instanceId}
        userId={userId}
        isOpen={resignCoordinatorOpen}
        onOpenChange={setResignCoordinatorOpen}
      />
    </>
  )
}
