import {auth} from '@/auth'

import {getInstanceId} from '@/database/services/Instance/getInstanceId'
import {getSystemIndex} from '@/database/services/System/getSystemIndex'
import {type SystemIndex} from '@/database/services/System/getSystemIndex'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import CaveCreationForm from '@/components/Templates/documents/edition-forms/cave-creation-form'

import {LuPlusCircle} from 'react-icons/lu'
import HelpButton from '@/documentation/components/help-button'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function CaveCreationPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el id de la instancia
  const instanceId = await getInstanceId(instanceName)

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Obtener el indice de sistemas (para el select)
  const systemIndex = (await getSystemIndex(instanceName)).content as
    | SystemIndex[]
    | undefined

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
          title={`Crear cavidad en ${instanceName}`}
          icon={<LuPlusCircle />}
        />
      }
    >
      <HelpButton
        text="Cavidades"
        topicSlug="caves"
      />
      <CaveCreationForm
        instanceId={instanceId}
        commanderId={userId}
        systemIndex={systemIndex}
      />
    </BasicCard>
  )
}
