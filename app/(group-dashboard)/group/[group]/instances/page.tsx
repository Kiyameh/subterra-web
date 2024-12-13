import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import {PopulatedGroup} from '@/database/models/Group.model'
import {getOneGroup} from '@/database/services/group.services'

import PageContainer from '@/components/theming/page-container'
import {getSomeInstances} from '@/database/services/instance.services'
import {PopulatedInstance} from '@/database/models/Instance.model'
import InstancesTable, {
  InstancesTableRow,
} from '@/components/_Organisms/tables/instances-table'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupInstancesPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener instancias
  const instances = (await getSomeInstances(group?.instances)).content as
    | PopulatedInstance[]
    | null

  // Validar roles de usuario
  if (!group || !instances) {
    return (
      <PageContainer>
        <NotFoundCard
          title="Algo ha ido mal"
          text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
        />
      </PageContainer>
    )
  }

  // Generar las filas de la tabla

  const rows: InstancesTableRow[] = instances.map((instance) => ({
    _id: instance._id,
    name: instance.name,
    fullname: instance.fullname,
    territory: instance.territory,
    editors: instance.editors.map((editor) => editor.name),
    coordinator: instance.coordinator.name,
  }))

  return (
    <PageContainer className="justify-start">
      <InstancesTable rows={rows} />
    </PageContainer>
  )
}
