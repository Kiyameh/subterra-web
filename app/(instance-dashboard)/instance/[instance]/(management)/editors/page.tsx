import {Suspense} from 'react'
import InstasnceEditorsBoard from '@/components/instance-editors-board/instance-editors-board'
import PageContainer from '@/components/theming/page-container'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'

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
