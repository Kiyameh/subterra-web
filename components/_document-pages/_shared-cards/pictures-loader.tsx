import {getPlainCave, PlainCave} from '@/database/services/cave.actions'
import PicturesCard from './pictures-card'
import {getPlainSystem, PlainSystem} from '@/database/services/system.actions'
import {
  getPlainExploration,
  PlainExploration,
} from '@/database/services/exploration.actions'

/**
 * @version 1
 * @description Carga las imagenes de un documento. Necesariamente debe recibir una sola Id, según el tipo de documento
 * @param caveId id de la cueva
 * @param systemId id del sistema
 * @param explorationId id de la exploración
 */

export default async function PicturesLoader({
  caveId,
  systemId,
  explorationId,
}: {
  caveId?: string
  systemId?: string
  explorationId?: string
}) {
  // Obtener el documento
  let document = null

  if (caveId) {
    document = (await getPlainCave(caveId)).content as PlainCave | null
  }
  if (systemId) {
    document = (await getPlainSystem(systemId)).content as PlainSystem | null
  }
  if (explorationId) {
    document = (await getPlainExploration(explorationId))
      .content as PlainExploration | null
  }

  if (!document || !document?.pictures?.[0]) {
    return null
  }

  return <PicturesCard pictures={document?.pictures || []} />
}
