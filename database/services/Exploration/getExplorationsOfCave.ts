'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Exploration from '@/database/models/Exploration.model'

/**
 * @version 1
 * @description Obtiene todas las exploraciones de una cueva
 * @param caveId id de la cueva
 */

export async function getExplorationsOfCave(caveId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const explorations = await Exploration.find({caves: caveId}).exec()
    if (!explorations) throw new Error('Exploraciones no encontradas')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const explorationPOJO = JSON.parse(JSON.stringify(explorations))

    return {
      ok: true,
      message: 'Exploración obtenida',
      content: explorationPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
