import {auth} from '@/auth'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import CollapsibleBox from '@/components/Molecules/boxes/collapsible-box'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import SystemCreationForm from '@/components/Templates/documents/edition-forms/system-creation-form'

import {RiApps2AddLine} from 'react-icons/ri'
import {getInstanceId} from '@/database/services/Instance/getInstanceId'

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
      <NotFoundCard
        title="Algo ha ido mal al cargar los datos"
        text="Intentalo de nuevo mas tarde"
      />
    )

  return (
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
          ● Los sistemas representan un complejo karstico y uno o varios accesos
          al mismo.
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
  )
}
