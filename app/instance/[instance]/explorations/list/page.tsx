import {Suspense} from 'react'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import PageContainer from '@/components/Organisms/theme/page-container'
import ExplorationListBoard from '@/components/Templates/explorations/index/exploration-list-board'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function ExplorationListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={<SkeletonCard className="w-full" />}>
        <ExplorationListBoard instanceName={instanceName} />
      </Suspense>
    </PageContainer>
  )
}
