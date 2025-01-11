import {Suspense} from 'react'
import SkeletonCard from '@/components/cards/skeleton-card'
import CaveListBoard from '@/components/_document-pages/cave-list-board/cave-list-board'
import PageContainer from '@/components/theming/page-container'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function CaveListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={<SkeletonCard className="w-full" />}>
        <CaveListBoard instanceName={instanceName} />
      </Suspense>
    </PageContainer>
  )
}
