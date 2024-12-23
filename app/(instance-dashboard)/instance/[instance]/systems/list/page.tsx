import {Suspense} from 'react'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import SystemListBoard from '@/components/system-list-board/system-list-board'
import PageContainer from '@/components/theming/page-container'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function SystemListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={<SkeletonCard className="w-full" />}>
        <SystemListBoard instanceName={instanceName} />
      </Suspense>
    </PageContainer>
  )
}
