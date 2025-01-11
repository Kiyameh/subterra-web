import {auth} from '@/auth'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import NotFoundCard from '@/components/cards/404-not-found'
import ExplorationCreationForm from '@/components/_document-pages/exploration-cretion-form'
import PageContainer from '@/components/theming/page-container'
import {GroupIndex} from '@/database/services/group.actions'
import {CaveIndex, getCaveIndex} from '@/database/services/cave.actions'
import {getGroupsIndex} from '@/database/services/group.actions'
import {getInstanceId} from '@/database/services/instance.actions'
import {GrChapterAdd} from 'react-icons/gr'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function ExplorationCreationPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el id de la instancia
  const instanceId = await getInstanceId(instanceName)

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Obtener el índice de cavidades (para el select):
  const caveIndex = (await getCaveIndex(instanceName))?.content as
    | CaveIndex[]
    | undefined

  // Obtener in índice de grupos (para el select):
  const groupIndex = (await getGroupsIndex())?.content as
    | GroupIndex[]
    | undefined

  if (!instanceId || !userId)
    return (
      <PageContainer>
        <NotFoundCard
          title="Algo ha ido mal al cargar los datos"
          text="Intentalo de nuevo mas tarde"
        />
      </PageContainer>
    )

  return (
    <PageContainer className="justify-start">
      <BasicCard
        defaultWidth="xl"
        cardHeader={
          <CardTitle
            title={`Nuevo informe de exploración en ${instanceName}`}
            icon={<GrChapterAdd />}
          />
        }
      >
        <CollapsibleBox
          title={`Informes de exploración`}
          color="info"
        >
          <p>
            ● Los informes de exploración representan una o más jornadas de
            exploración.
          </p>
          <p>
            ● Pertenecen a un grupo, y sirven para llevar un registro de las
            actividades realizadas por sus miembros.
          </p>
          <p>
            ● Se pueden relacionar con una o con varias cavidades para
            localizarlas con facilidad.
          </p>
          <p>
            ● Revisa los datos con atención antes de enviar el formulario. El
            informe se añadira a la instancia actual.
          </p>
        </CollapsibleBox>
        <ExplorationCreationForm
          instanceId={instanceId}
          commanderId={userId}
          groupIndex={groupIndex}
          caveIndex={caveIndex}
        />
      </BasicCard>
    </PageContainer>
  )
}
