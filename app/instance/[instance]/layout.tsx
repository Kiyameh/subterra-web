import React from 'react'
import {auth} from '@/auth'

import {getOneInstance} from '@/database/services/Instance/getOneInstance'
import {type InstanceWithUsers} from '@/database/services/Instance/getOneInstance'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import UnauthorizedCard from '@/components/Organisms/containers/401-unauthorized'
import PageContainer from '@/components/Organisms/theme/page-container'

import DualSidebarLayout from '@/components/Templates/sidebars/dual-sidebar-layout'
import HelpSidebar from '@/components/Templates/sidebars/help/help-sidebar'
import InstanceSidebar from '@/components/Templates/sidebars/instance/instance-sidebar'

interface InstanceDashboardLayoutProps {
  params: Promise<{instance: string}>
  children: React.ReactNode
}

/**
 * Layout principal de la sección de instancia
 */
export default async function InstanceDashboardLayout({
  params,
  children,
}: InstanceDashboardLayoutProps) {
  // Obtener nombre de la instancia de la URL:
  const instanceName = (await params).instance

  // Obtener la instancia actual:
  const instance = (await getOneInstance(instanceName))
    .content as InstanceWithUsers

  // Obtener el suario actual:
  const user = (await auth())?.user

  // Comprobar si la instancia es privada:
  const isPublic = instance?.public_visibility

  // Comprobar si el usuario es editor de la instancia:
  const isEditor = await checkIsEditor(user?._id, instanceName)

  // Obtener el nombre del grupo de la instancia:
  const group = instance?.owner

  return (
    <DualSidebarLayout
      leftSlot={<InstanceSidebar />}
      rightSlot={<HelpSidebar />}
    >
      {/* Contenido de la página */}
      <PageContainer className="justify-start">
        {!isPublic && !isEditor ? (
          <UnauthorizedCard
            title="Instancia privada"
            text={`La instancia ${instanceName} es privada y solo puede ser accedida por editores. Pertenece a ${group.fullname}, si deseas acceder a ella, solicita permisos al grupo.`}
            redirectUrl={`/group/${group.name}`}
            redirectLabel={`Ir a ${group.fullname}`}
            showContactButton={false}
          />
        ) : (
          <>{children}</>
        )}
      </PageContainer>
    </DualSidebarLayout>
  )
}
