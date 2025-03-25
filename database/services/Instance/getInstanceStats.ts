'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Cave from '@/database/models/Cave.model'
import System from '@/database/models/System.model'
import Exploration from '@/database/models/Exploration.model'

/**
 * @version 1
 * @description Función para obtener las estadisticas de una instancia
 * @param instanceId string (id de la instancia)
 */

export async function getInstanceStats(instanceId: string) {
  try {
    await connectToMongoDB()
    const numberOfCaves = await Cave.countDocuments({
      instances: {$in: [instanceId]},
    })
    const numberOfSystems = await System.countDocuments({
      instances: {$in: [instanceId]},
    })
    const numberOfExplorations = await Exploration.countDocuments({
      instances: {$in: [instanceId]},
    })

    return {
      ok: true,
      message: 'Estadisticas obtenidas',
      content: {
        numberOfCaves,
        numberOfSystems,
        numberOfExplorations,
      },
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
