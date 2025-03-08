import {getPlainCave, PlainCave} from '@/database/services/cave.actions'
import PicturesCard from './pictures-card'

export default async function PicturesLoader({caveId}: {caveId: string}) {
  // Obtener la cavidad
  const cave = (await getPlainCave(caveId)).content as PlainCave | null

  return <PicturesCard pictures={cave?.pictures || []} />
}
