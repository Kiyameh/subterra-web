import {Suspense} from 'react'

import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import ExplorationListBoard from '@/components/Templates/documents/list-view/exploration-list-board'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function ExplorationListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  return (
    <Suspense fallback={<SkeletonCard className="w-full" />}>
      <ExplorationListBoard instanceName={instanceName} />
    </Suspense>
  )
}
