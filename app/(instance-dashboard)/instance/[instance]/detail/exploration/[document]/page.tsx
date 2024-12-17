import PageContainer from '@/components/theming/page-container'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import ImageCard from '@/components/_Molecules/cards/image-card'
import {getOneExploration} from '@/database/services/exploration.services'
import ExplorationInfoCard from '@/components/_Molecules/cards/exploration-info-card'
import {PopulatedExploration} from '@/database/models/Exploration.model'
import ExplorationDescriptionCard from '@/components/_Molecules/cards/exploration-description-card'

interface PageProps {
  params: Promise<{document: string}>
}

export default async function ExplorationDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const documentId: string = (await params).document

  // Obtener la cavidad
  const exploration = (await getOneExploration(documentId))
    .content as PopulatedExploration | null

  if (!exploration) {
    return (
      <PageContainer>
        <NotFoundCard
          title="Algo ha ido mal al cargar los datos"
          text="Intentalo de nuevo más tarde"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer className="justify-start">
      <ImageCard />
      <div className="flex gap-4 flex-wrap justify-center">
        <ExplorationInfoCard exploration={exploration} />
        <ExplorationDescriptionCard exploration={exploration} />
      </div>
    </PageContainer>
  )
}
