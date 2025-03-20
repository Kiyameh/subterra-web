'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import Cave from '@/database/models/Cave.model'
import System from '@/database/models/System.model'
import {SystemDocument} from '@/database/types/System'
import {PlainCave} from '@/database/services/Cave/getPlainCave'

/**
 * @type Interface de retorno de la función getOneSystem
 */

export interface PopulatedSystem extends Omit<SystemDocument, 'instances'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances?: string[]
  // insertados:
  caves: PlainCave[]
}

/**
 * @version 1
 * @description Obtener los datos de un sistema
 * @param systemId id del sistema
 * @returns content Datos del sistema
 */

export async function getPopulatedSystem(systemId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const system = await System.findById(systemId).exec()
    if (!system) throw new Error('Sistema no encontrado')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const systemPOJO = JSON.parse(JSON.stringify(system))

    // Insertar cavidades:
    const caves = await Cave.find({system: systemId})
    const cavesPOJO = caves.map((cave) => {
      return JSON.parse(JSON.stringify(cave))
    })

    systemPOJO.caves = cavesPOJO

    return {
      ok: true,
      message: 'Sistema obtenido',
      content: systemPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
