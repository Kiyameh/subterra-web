'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Exploration from '@/database/models/Exploration.model'

import {type ExplorationDocument} from '@/database/types/Exploration'

/**
 * @type Interface de retorno de la función getPlainExploration
 */

export interface PlainExploration
  extends Omit<ExplorationDocument, 'caves' | 'instances' | 'groups'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances: string[]

  // poblados:
  caves: string[]
  groups: string[]
}

/**
 * @version 1
 * @description Obtiene los datos de una exploración sin los campos poblados
 * @param explorationId id de la exploración
 * @returns content: Datos de la exploración planos
 */

export async function getPlainExploration(
  explorationId: string
): Promise<Answer> {
  try {
    await connectToMongoDB()
    const exploration = await Exploration.findById(explorationId).exec()
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
