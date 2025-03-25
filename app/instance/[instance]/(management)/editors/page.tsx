import {Suspense} from 'react'

import PageContainer from '@/components/Organisms/theme/page-container'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import InstasnceEditorsBoard from '@/components/Templates/instances/instance-editors-board/instance-editors-board'

interface PageProps {
  params: Promise<{instance: string}>
}

export default async function InstanceEditorsPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={<SkeletonCard className="w-full" />}>
        <InstasnceEditorsBoard instanceName={instanceName} />
      </Suspense>
    </PageContainer>
  )
}
