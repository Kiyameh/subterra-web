import {Suspense} from 'react'

import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import InstasnceEditorsBoard from '@/components/Templates/instances/instance-editors-board/instance-editors-board'

interface PageProps {
  params: Promise<{instance: string}>
}

export default async function InstanceEditorsPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  return (
    <Suspense fallback={<SkeletonCard className="w-full" />}>
      <InstasnceEditorsBoard instanceName={instanceName} />
    </Suspense>
  )
}
