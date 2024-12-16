import HeaderBox from '@/components/_Atoms/boxes/header-box'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import InstanceInfoCard from '@/components/_Molecules/cards/instance-info-card'
import InstanceStatsCard from '@/components/_Molecules/cards/instance-stats-card'
import TerritoryCard from '@/components/_Molecules/cards/territory-card'
import PageContainer from '@/components/theming/page-container'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneInstance} from '@/database/services/instance.services'
import {FiBox} from 'react-icons/fi'

interface PageProps {
  params: Promise<{instance: string}>
}

export default async function InstanceLandingPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName: string = (await params).instance

  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as PopulatedInstance | null

  if (!instance) {
    return (
      <PageContainer>
        <NotFoundCard
          title="Algo ha ido mal"
          text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="flex gap-4 flex-wrap justify-center">
        <HeaderBox
          text={instance.fullname}
          icon={<FiBox />}
        />
        <InstanceInfoCard
          _id={instance._id}
          name={instance.name}
          fullname={instance.fullname}
          acronym={instance.acronym}
          owner={instance.owner}
          description={instance.description}
        />
        <InstanceStatsCard editorsLength={instance.editors.length} />
        <TerritoryCard map_image={instance.map_image} />
      </div>
    </PageContainer>
  )
}
