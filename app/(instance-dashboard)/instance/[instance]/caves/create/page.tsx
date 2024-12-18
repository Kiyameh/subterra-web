import {auth} from '@/auth'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import CaveCreationForm from '@/components/_Organisms/forms/cave-creation-form'
import PageContainer from '@/components/theming/page-container'
import {SystemIndex} from '@/database/models/System.model'
import {getSystemIndex} from '@/database/services/system.services'
import {LuPlusCircle} from 'react-icons/lu'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function CaveCreationPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Obtener el indice de sistemas (para el select)
  const systemIndex = (await getSystemIndex(instanceName)).content as
    | SystemIndex[]
    | undefined

  return (
    <PageContainer className="justify-start">
      {userId ? (
        <BasicCard
          defaultWidth="xl"
          cardHeader={
            <CardTitle
              title={`Crear cavidad en ${instanceName}`}
              icon={<LuPlusCircle />}
            />
          }
        >
          <CollapsibleBox
            title={`Cavidades`}
            color="info"
          >
            <p>
              ● Las cavidades representan una unica entrada a una cueva o
              sistema de cuevas.
            </p>
            <p>
              ● Cada cavidad puede pertenecer a un solo sistema, pero un sistema
              puede tener varias cavidades.
            </p>
            <p>
              ● Revisa los datos con atención antes de enviar el formulario. La
              cavidad se añadira a la instancia actual.
            </p>
          </CollapsibleBox>
          <CaveCreationForm
            instanceName={instanceName}
            commanderId={userId}
            systemIndex={systemIndex}
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
