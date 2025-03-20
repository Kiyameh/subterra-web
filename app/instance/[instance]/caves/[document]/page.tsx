import {Suspense} from 'react'
import PageContainer from '@/components/Organisms/theme/page-container'
import CaveInfoCard from '@/components/Templates/caves/details/cave-info-card'
import CaveLocationCard from '@/components/Templates/caves/details/cave-location-card'
import ExplorationsCards from '@/components/Templates/caves/details/explorations-card'
import CaveHeader from '@/components/Templates/caves/details/cave-header'
import SkeletonHeader from '@/components/Organisms/containers/skelenton-header'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import CaveDescriptionCard from '@/components/Templates/caves/details/cave-description-card'
import CaveScienceCard from '@/components/Templates/caves/details/cave-science-card'
import PicturesLoader from '@/components/Templates/document-cards/pictures-loader'
import TopographiesLoader from '@/components/Templates/document-cards/topographies-loader'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function CaveDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  return (
    <PageContainer className="justify-start">
      {/* Header */}
      <div className="flex flex-col items-center w-full">
        <Suspense fallback={<SkeletonHeader />}>
          <CaveHeader
            caveId={document}
            instanceName={instance}
          />
        </Suspense>
      </div>

      {/* Content */}
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

        <Suspense fallback={<SkeletonCard />}>
          <PicturesLoader caveId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <TopographiesLoader caveId={document} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
