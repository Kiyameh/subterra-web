import {Suspense} from 'react'
import PageContainer from '@/components/Organisms/theme/page-container'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import CaveDetailsBoard from '@/components/Templates/caves/details/cave-details-board'
import {getPlainCave, PlainCave} from '@/database/services/Cave/getPlainCave'
import {auth} from '@/auth'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function CaveDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  // Obtener la cueva
  const cave = (await getPlainCave(document)).content as PlainCave | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instance)

  if (!cave) {
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
        <CaveDetailsBoard
          caveId={document}
          isEditor={isEditor}
          commanderId={userId}
          cave={cave}
        />
      </Suspense>
    </PageContainer>
  )
}
