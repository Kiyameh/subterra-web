import InstanceHeader from '@/components/_instance-dashboard/instance-detail-board/instance-header'
import InstanceInfoCard from '@/components/_instance-dashboard/instance-detail-board/instance-info-card'
import InstanceStatsCard from '@/components/_instance-dashboard/instance-detail-board/instance-stats-card'
import SkeletonHeader from '@/components/cards/skelenton-header'
import SkeletonCard from '@/components/cards/skeleton-card'
import TerritoryCard from '@/components/_instance-dashboard/instance-detail-board/territory-card'
import PageContainer from '@/components/theming/page-container'
import {Suspense} from 'react'

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
