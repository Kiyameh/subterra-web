import {Suspense} from 'react'
import PageContainer from '@/components/Organisms/theme/page-container'
import ExplorationInfoCard from '@/components/Templates/explorations/details/exploration-info-card'
import ExplorationDescriptionCard from '@/components/Templates/explorations/details/exploration-description-card'
import ExplorationHeader from '@/components/Templates/explorations/details/exploration-header'
import SkeletonHeader from '@/components/Organisms/containers/skelenton-header'
import ExplorationCavesCard from '@/components/Templates/explorations/details/exploration-caves-card'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import PicturesLoader from '@/components/Templates/document-cards/pictures-loader'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function ExplorationDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  return (
    <PageContainer className="justify-start">
      {/* Header */}
      <div className="flex flex-col items-center w-full">
        <Suspense fallback={<SkeletonHeader />}>
          <ExplorationHeader
            explorationId={document}
            instanceName={instance}
          />
        </Suspense>
      </div>

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

        <Suspense fallback={<SkeletonCard />}>
          <PicturesLoader explorationId={document} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
