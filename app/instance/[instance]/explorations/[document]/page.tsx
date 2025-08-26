import {Suspense} from 'react'
import {auth} from '@/auth'

import {getPlainExploration} from '@/database/services/Exploration/getPlainExploration'
import {type PlainExploration} from '@/database/services/Exploration/getPlainExploration'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import ExplorationDetailsBoard from '@/components/Templates/documents/details-boards/board-exploration'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function ExplorationDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  // Obtener la exploración:
  const exploration = (await getPlainExploration(document))
    .content as PlainExploration | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instance)

  if (!exploration) {
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
    <Suspense fallback={<SkeletonCard />}>
      <ExplorationDetailsBoard
        explorationId={document}
        isEditor={isEditor}
        commanderId={userId}
        exploration={exploration}
      />
    </Suspense>
  )
}
