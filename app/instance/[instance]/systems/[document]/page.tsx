import {Suspense} from 'react'
import {auth} from '@/auth'

import {getPlainSystem} from '@/database/services/System/getPlainSystem'
import {type PlainSystem} from '@/database/services/System/getPlainSystem'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import PageContainer from '@/components/Organisms/theme/page-container'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import SystemDetailsBoard from '@/components/Templates/documents/details-boards/board-system'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function SystemDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  // Obtener el sistema
  const system = (await getPlainSystem(document)).content as PlainSystem | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instance)

  if (!system) {
    return (
      <NotFoundCard
        title="Error al cargar los datos"
        text="
        No se ha podido cargar la información de la cueva seleccionada. Por favor, intente nuevamente más tarde
      "
      />
    )
  }

  return (
    <PageContainer className="justify-start max-w-full">
      <Suspense fallback={<SkeletonCard />}>
        <SystemDetailsBoard
          systemId={document}
          isEditor={isEditor}
          commanderId={userId}
          system={system}
        />
      </Suspense>
    </PageContainer>
  )
}
