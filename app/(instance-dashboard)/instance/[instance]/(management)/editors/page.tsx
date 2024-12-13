import {auth} from '@/auth'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import InstanceEditorsTable, {
  InstanceEditorsTableRow,
} from '@/components/_Organisms/tables/instance-editors-table'
import PageContainer from '@/components/theming/page-container'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {
  checkIsCoordinator,
  getOneInstance,
} from '@/database/services/instance.services'

interface PageProps {
  params: Promise<{instance: string}>
}

export default async function InstanceEditorsPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as PopulatedInstance | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isCoordinator = (await checkIsCoordinator(instanceName, userId))
    .ok as boolean

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

  // Generar las filas de la tabla
  const rows: InstanceEditorsTableRow[] = instance.editors.map((editor) => ({
    _id: editor._id,
    name: editor.name,
    image: editor.image,
    fullname: editor.fullname,
    email: editor.email,
    isCoordinator: instance.coordinator._id.toString() === editor._id,
  }))

  return (
    <PageContainer>
      <InstanceEditorsTable
        instanceId={instance._id}
        rows={rows}
        adminActions={isCoordinator}
      />
    </PageContainer>
  )
}
