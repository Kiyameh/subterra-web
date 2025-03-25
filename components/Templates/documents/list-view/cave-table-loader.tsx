import {auth} from '@/auth'

import {getCaveIndex} from '@/database/services/Cave/getCaveIndex'
import {type CaveIndex} from '@/database/services/Cave/getCaveIndex'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import {CavesTableLayout} from './caves-table-layout'

import {FaRegCircle} from 'react-icons/fa6'

/**
 * @version 1
 * @description Carga la tabla de cavidades
 * @param instanceName Nombre de la instancia
 * @param instanceId Id de la instancia
 * @param masterInstanceId Id de la instancia maestra
 */

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
    // TODO: REFORMULAR ESTA PARTE (MasterInstance eliminado)
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
