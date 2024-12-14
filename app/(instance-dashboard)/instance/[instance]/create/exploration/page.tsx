import {auth} from '@/auth'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import ExplorationCreationForm from '@/components/_Organisms/forms/exploration-cretion-form'
import PageContainer from '@/components/theming/page-container'
import {GrChapterAdd} from 'react-icons/gr'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function ExplorationCreationPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  return (
    <PageContainer className="justify-start">
      {userId ? (
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
            instanceName={instanceName}
            commanderId={userId}
          />
        </BasicCard>
      ) : (
        <NotFoundCard
          title="Algo ha ido mal"
          text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
        />
      )}
    </PageContainer>
  )
}
