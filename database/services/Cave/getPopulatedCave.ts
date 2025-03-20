'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import Cave from '@/database/models/Cave.model'
import System from '@/database/models/System.model'
import Exploration from '@/database/models/Exploration.model'

import {CaveDocument} from '@/database/types/Cave'
import {PlainSystem} from '@/database/services/System/getPlainSystem'
import {PlainExploration} from '@/database/services/Exploration/getPlainExploration'

/**
 * @version 2
 * @description Obtener los datos de una cueva con los campos poblados
 * @param caveId id de la cueva
 * @returns content: Datos de la cueva con system poblado
 */

export async function getPopulatedCave(caveId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const cave = await Cave.findById(caveId)
      .populate({path: 'system', model: System})
      .exec()
    if (!cave) throw new Error('Cavidad no encontrado')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const cavePOJO = JSON.parse(JSON.stringify(cave))

    // Insertar exploraciones:
    const explorations = await Exploration.find({
      caves: {$in: [caveId]},
    })
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const explorationsPOJO = explorations.map((exploration) => {
      return JSON.parse(JSON.stringify(exploration))
    })

    cavePOJO.explorations = explorationsPOJO

    return {
      ok: true,
      message: 'Cueva obtenida',
      content: cavePOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Interface de retorno de la función getPopulatedCave
 */

export interface PopulatedCave
  extends Omit<CaveDocument, 'system' | 'explorations' | 'instances'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances: string[]
  // poblados:
  system: PlainSystem
  // insertados:
  explorations: PlainExploration[]
}
//TODO: Eliminar "explorations" del omit cuando no exista
