'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Exploration from '@/database/models/Exploration.model'
import Cave from '@/database/models/Cave.model'
import Group from '@/database/models/Group.model'

import {type GroupObject} from '@/database/services/Group/getOneGroup'
import {type ExplorationDocument} from '@/database/types/Exploration'
import {type PlainCave} from '@/database/services/Cave/getPlainCave'

/**
 * @typo Interfaz de retorno de la función getPopulatedExploration
 */

export interface PopulatedExploration
  extends Omit<ExplorationDocument, 'caves' | 'instances' | 'groups'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances?: string[]
  // Poblados:
  caves: PlainCave[]
  groups?: GroupObject[]
}

/**
 * @version 1
 * @description Obtiene los datos de una exploración
 * @param explorationId id de la exploración
 * @returns content: Datos de la exploración con caves y group poblados
 */

export async function getPopulatedExploration(
  explorationId: string
): Promise<Answer> {
  try {
    await connectToMongoDB()
    const exploration = await Exploration.findById(explorationId)
      .populate({path: 'caves', model: Cave})
      .populate({path: 'groups', model: Group})
      .exec()
    if (!exploration) throw new Error('Exploración no encontrada')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const explorationPOJO = JSON.parse(JSON.stringify(exploration))

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
