import PageContainer from '@/components/theming/page-container'
import ImageCard from '@/components/_Molecules/cards/image-card'
import SystemInfoCard from '@/components/system-dashboard/system-info-card'
import SystemCavesCard from '@/components/system-dashboard/system-caves-card'
import SystemHeader from '@/components/system-dashboard/system-header'
import SystemDescriptionCard from '@/components/system-dashboard/system-description-card'
import SystemScienceCard from '@/components/system-dashboard/system-science-card'
import SkeletonHeader from '@/components/_Molecules/cards/skelenton-header'
import {Suspense} from 'react'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import DocumentNotificationArea from '@/components/_Molecules/interactives/document-notification-area/document-notification-area'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function SystemDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={null}>
        <DocumentNotificationArea
          instanceName={instance}
          type="system"
        />
      </Suspense>

      <ImageCard />

      <Suspense fallback={<SkeletonHeader />}>
        <SystemHeader systemId={document} />
      </Suspense>

      <div className="flex gap-4 flex-wrap justify-center">
        <Suspense fallback={<SkeletonCard />}>
          <SystemInfoCard systemId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <SystemDescriptionCard systemId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <SystemScienceCard systemId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <SystemCavesCard systemId={document} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
