import {Suspense} from 'react'
import SkeletonCard from '@/components/cards/skeleton-card'
import ExplorationListBoard from '@/components/_document-pages/exploration-list-board/exploration-list-board'
import PageContainer from '@/components/theming/page-container'

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
