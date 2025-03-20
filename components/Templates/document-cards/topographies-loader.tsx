import {getPlainCave, PlainCave} from '@/database/services/Cave/getPlainCave'
import TopographiesCard from './topographies-card'
import {PlainSystem} from '@/database/services/System/getPlainSystem'
import {getPlainSystem} from '@/database/services/System/getPlainSystem'

/**
 * @version 1
 * @description Carga las topografias de un documento. Necesariamente debe recibir una sola Id, según el tipo de documento
 * @param caveId id de la cueva
 * @param systemId id del sistema
 * @param explorationId id de la exploración
 */

export default async function TopographiesLoader({
  caveId,
  systemId,
}: {
  caveId?: string
  systemId?: string
}) {
  // Obtener el documento
  let document = null

  if (caveId) {
    document = (await getPlainCave(caveId)).content as PlainCave | null
  }
  if (systemId) {
    document = (await getPlainSystem(systemId)).content as PlainSystem | null
  }

  if (!document || !document?.topographies?.[0]) {
    return null
  }

  return <TopographiesCard topographies={document?.topographies || []} />
}
