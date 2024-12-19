import PageContainer from '@/components/theming/page-container'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import ImageCard from '@/components/_Molecules/cards/image-card'
import CaveInfoCard from '@/components/_Molecules/cards/cave-info-card'
import CaveLocationCard from '@/components/_Molecules/cards/cave-location-card'
import ScienceCard from '@/components/_Molecules/cards/science-card'
import ExplorationsCards from '@/components/_Molecules/cards/explorations-card'
import DescriptionCard from '@/components/_Molecules/cards/description-card'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import EditDocumentBanner from '@/components/_Molecules/interactives/edit-document-banner'
import {getPopulatedCave, PopulatedCave} from '@/database/services/cave.actions'
import {auth} from '@/auth'
import {checkIsEditor} from '@/database/services/instance.services'

interface PageProps {
  params: Promise<{document: string; instance: string}>
}

export default async function CaveDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const {instance, document} = await params

  // Obtener la cavidad
  const cave = (await getPopulatedCave(document))
    .content as PopulatedCave | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = (await checkIsEditor(userId, instance)).ok as boolean

  if (!cave) {
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
          type="cave"
          removeLabel="Eliminar cavidad"
          editLabel="Editar cavidad"
          commanderId={userId}
        />
      )}

      <ImageCard />
      <HeaderBox text={cave.name} />
      <div className="flex gap-4 flex-wrap justify-center">
        <CaveInfoCard cave={cave} />
        <CaveLocationCard cave={cave} />
        <DescriptionCard
          description={cave.description}
          locationDescription={cave.location_description}
        />
        <ScienceCard document={cave} />
        <ExplorationsCards explorations={cave.explorations} />
      </div>
    </PageContainer>
  )
}
