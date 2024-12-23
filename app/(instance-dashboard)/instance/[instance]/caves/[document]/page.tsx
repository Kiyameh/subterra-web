import {Suspense} from 'react'
import PageContainer from '@/components/theming/page-container'
import ImageCard from '@/components/_Molecules/cards/image-card'
import CaveInfoCard from '@/components/cave-details-board/cave-info-card'
import CaveLocationCard from '@/components/cave-details-board/cave-location-card'
import ExplorationsCards from '@/components/cave-details-board/explorations-card'
import DocumentNotificationArea from '@/components/_Molecules/interactives/document-notification-area/document-notification-area'
import CaveHeader from '@/components/cave-details-board/cave-header'
import SkeletonHeader from '@/components/_Molecules/cards/skelenton-header'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import CaveDescriptionCard from '@/components/cave-details-board/cave-description-card'
import CaveScienceCard from '@/components/cave-details-board/cave-science-card'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function CaveDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={null}>
        <DocumentNotificationArea
          instanceName={instance}
          type="cave"
        />
      </Suspense>

      <ImageCard />

      <Suspense fallback={<SkeletonHeader />}>
        <CaveHeader caveId={document} />
      </Suspense>

      <div className="flex gap-4 flex-wrap justify-center">
        <Suspense fallback={<SkeletonCard />}>
          <CaveInfoCard caveId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <CaveLocationCard caveId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <CaveDescriptionCard caveId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <CaveScienceCard caveId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <ExplorationsCards caveId={document} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
