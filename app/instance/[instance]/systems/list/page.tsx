import {Suspense} from 'react'

import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import SystemListBoard from '@/components/Templates/documents/list-view/system-list-board'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function SystemListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  return (
    <Suspense fallback={<SkeletonCard className="w-full" />}>
      <SystemListBoard instanceName={instanceName} />
    </Suspense>
  )
}
