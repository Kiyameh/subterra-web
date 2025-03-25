import {Suspense} from 'react'

import SkeletonHeader from '@/components/Organisms/containers/skelenton-header'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import PageContainer from '@/components/Organisms/theme/page-container'
import InstanceHeader from '@/components/Templates/instances/instance-detail-board/instance-header'
import InstanceInfoCard from '@/components/Templates/instances/instance-detail-board/instance-info-card'
import InstanceStatsCard from '@/components/Templates/instances/instance-detail-board/instance-stats-card'
import TerritoryCard from '@/components/Templates/instances/instance-detail-board/territory-card'

interface PageProps {
  params: Promise<{instance: string}>
}

export default async function InstanceLandingPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName: string = (await params).instance

  return (
    <PageContainer>
      <div className="flex gap-4 flex-wrap justify-center">
        <Suspense fallback={<SkeletonHeader />}>
          <InstanceHeader instanceName={instanceName} />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <InstanceInfoCard instanceName={instanceName} />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <InstanceStatsCard instanceName={instanceName} />
        </Suspense>
        <Suspense fallback={<SkeletonCard defaultWidth="xl" />}>
          <TerritoryCard instanceName={instanceName} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
