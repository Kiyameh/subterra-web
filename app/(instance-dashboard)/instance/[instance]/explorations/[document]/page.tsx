import PageContainer from '@/components/theming/page-container'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import ImageCard from '@/components/_Molecules/cards/image-card'
import ExplorationInfoCard from '@/components/_Molecules/cards/exploration-info-card'
import ExplorationDescriptionCard from '@/components/_Molecules/cards/exploration-description-card'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import EditDocumentBanner from '@/components/_Molecules/interactives/edit-document-banner'
import {
  getPopulatedExploration,
  PopulatedExploration,
} from '@/database/services/exploration.actions'
import {auth} from '@/auth'
import {checkIsEditor} from '@/database/services/instance.services'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function ExplorationDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  // Obtener la cavidad
  const exploration = (await getPopulatedExploration(document))
    .content as PopulatedExploration | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = (await checkIsEditor(userId, instance)).ok as boolean

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
      {userId && isEditor && (
        <EditDocumentBanner
          type="exploration"
          removeLabel="Eliminar exploración"
          editLabel="Editar exploración"
          commanderId={userId}
        />
      )}

      <ImageCard />
      <HeaderBox text={exploration.name} />
      <div className="flex gap-4 flex-wrap justify-center">
        <ExplorationInfoCard exploration={exploration} />
        <ExplorationDescriptionCard exploration={exploration} />
      </div>
    </PageContainer>
  )
}
