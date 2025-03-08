import {getPlainCave, PlainCave} from '@/database/services/cave.actions'
import TopographiesCard from './topographies-card'

export default async function TopographiesLoader({caveId}: {caveId: string}) {
  // Obtener la cavidad
  const cave = (await getPlainCave(caveId)).content as PlainCave | null

  return <TopographiesCard topographies={cave?.topographies || []} />
}
