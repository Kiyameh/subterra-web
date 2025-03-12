import {auth} from '@/auth'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import NotFoundCard from '@/components/cards/404-not-found'
import SystemCreationForm from '@/components/_document-pages/system-edition-board/system-creation-form'
import PageContainer from '@/components/theming/page-container'
import {getInstanceId} from '@/database/services/instance.actions'

import {RiApps2AddLine} from 'react-icons/ri'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function SystemCreationPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el id de la instancia
  const instanceId = await getInstanceId(instanceName)

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

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
            title={`Crear sistema en ${instanceName}`}
            icon={<RiApps2AddLine />}
          />
        }
      >
        <CollapsibleBox
          title={`Sistemas`}
          color="info"
        >
          <p>
            ● Los sistemas representan un complejo karstico y uno o varios
            accesos al mismo.
          </p>
          <p>
            ● Cada cavidad puede pertenecer a un solo sistema, pero un sistema
            puede tener varias cavidades.
          </p>
          <p>
            ● Revisa los datos con atención antes de enviar el formulario. El
            sistema se añadira a la instancia actual.
          </p>
        </CollapsibleBox>
        <SystemCreationForm
          instanceId={instanceId}
          commanderId={userId}
        />
      </BasicCard>
    </PageContainer>
  )
}
