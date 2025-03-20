import {auth} from '@/auth'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import NotFoundCard from '@/components/cards/404-not-found'
import {CaveIndex, getCaveIndex} from '@/database/services/Cave/getCaveIndex'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'
import {CavesTableLayout} from './caves-table-layout'
import {FaRegCircle} from 'react-icons/fa6'
import CardTitle from '@/components/_Atoms/boxes/card-title'

export default async function CaveTableLoader({
  instanceName,
  instanceId,
  masterInstanceId,
}: {
  instanceName: string
  instanceId: string
  masterInstanceId?: string
}) {
  let cavesIndex: CaveIndex[] | undefined = []

  // ELIMINAR

  if (masterInstanceId) {
    console.log(instanceId)
    // TODO: OBTENER CUEVA FETCHEADA
  } else {
    cavesIndex = (await getCaveIndex(instanceName)).content as
      | CaveIndex[]
      | undefined
  }

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instanceName)

  if (!cavesIndex)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Intentalo de nuevo más tarde"
      />
    )
  return (
    <BasicCard
      className="w-full"
      cardHeader={
        <CardTitle
          title={`Cavidades de ${instanceName}`}
          icon={<FaRegCircle />}
        />
      }
    >
      <CavesTableLayout
        data={cavesIndex}
        instanceName={instanceName}
        isEditor={isEditor}
      />
    </BasicCard>
  )
}
