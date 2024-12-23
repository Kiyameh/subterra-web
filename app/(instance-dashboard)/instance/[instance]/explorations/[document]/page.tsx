import {Suspense} from 'react'
import PageContainer from '@/components/theming/page-container'
import ImageCard from '@/components/_Molecules/cards/image-card'
import ExplorationInfoCard from '@/components/exploration-details-board/exploration-info-card'
import ExplorationDescriptionCard from '@/components/exploration-details-board/exploration-description-card'
import DocumentNotificationArea from '@/components/_Molecules/interactives/document-notification-area/document-notification-area'
import ExplorationHeader from '@/components/exploration-details-board/exploration-header'
import SkeletonHeader from '@/components/_Molecules/cards/skelenton-header'
import ExplorationCavesCard from '@/components/exploration-details-board/exploration-caves-card'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function ExplorationDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={null}>
        <DocumentNotificationArea
          instanceName={instance}
          type="exploration"
        />
      </Suspense>

      <ImageCard />

      <Suspense fallback={<SkeletonHeader />}>
        <ExplorationHeader explorationId={document} />
      </Suspense>

      <div className="flex gap-4 flex-wrap justify-center">
        <Suspense fallback={<SkeletonCard />}>
          <ExplorationInfoCard explorationId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <ExplorationDescriptionCard explorationId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <ExplorationCavesCard explorationId={document} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
