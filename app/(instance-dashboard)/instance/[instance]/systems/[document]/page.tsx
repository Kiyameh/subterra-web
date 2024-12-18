import PageContainer from '@/components/theming/page-container'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import ImageCard from '@/components/_Molecules/cards/image-card'
import ScienceCard from '@/components/_Molecules/cards/science-card'
import DescriptionCard from '@/components/_Molecules/cards/description-card'
import SystemInfoCard from '@/components/_Molecules/cards/system-info-card'
import CavesCard from '@/components/_Molecules/cards/caves-card'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import EditDocumentBanner from '@/components/_Molecules/interactives/edit-document-banner'
import {
  getPopulatedSystem,
  PopulatedSystem,
} from '@/database/services/system.actions'
import {auth} from '@/auth'

interface PageProps {
  params: Promise<{document: string}>
}

export default async function SystemDetailPage({params}: PageProps) {
  // Obtener el id del documento
  const documentId: string = (await params).document

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Obtener la cavidad
  const system = (await getPopulatedSystem(documentId))
    .content as PopulatedSystem | null

  if (!system || !userId) {
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
      <EditDocumentBanner
        type="system"
        removeLabel="Eliminar sistema"
        editLabel="Editar sistema"
        commanderId={userId}
      />
      <ImageCard />
      <HeaderBox text={system.name} />

      <div className="flex gap-4 flex-wrap justify-center">
        <SystemInfoCard system={system} />
        <DescriptionCard description={system.description} />
        <ScienceCard document={system} />
        {system.caves && <CavesCard caves={system.caves} />}
      </div>
    </PageContainer>
  )
}
