import PageContainer from '@/components/Organisms/theme/page-container'
import SystemInfoCard from '@/components/Templates/systems/details/system-info-card'
import SystemCavesCard from '@/components/Templates/systems/details/system-caves-card'
import SystemHeader from '@/components/Templates/systems/details/system-header'
import SystemDescriptionCard from '@/components/Templates/systems/details/system-description-card'
import SystemScienceCard from '@/components/Templates/systems/details/system-science-card'
import SkeletonHeader from '@/components/Organisms/containers/skelenton-header'
import {Suspense} from 'react'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import PicturesLoader from '@/components/Templates/document-cards/pictures-loader'
import TopographiesLoader from '@/components/Templates/document-cards/topographies-loader'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function SystemDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  return (
    <PageContainer className="justify-start">
      {/* Header */}
      <div className="flex flex-col items-center w-full">
        <Suspense fallback={<SkeletonHeader />}>
          <SystemHeader
            systemId={document}
            instanceName={instance}
          />
        </Suspense>
      </div>

      {/* Content */}
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

        <Suspense fallback={<SkeletonCard />}>
          <PicturesLoader systemId={document} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <TopographiesLoader systemId={document} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
