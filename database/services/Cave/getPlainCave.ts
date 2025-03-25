'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Cave from '@/database/models/Cave.model'

import {type CaveDocument} from '@/database/types/Cave'

/**
 * @version 2
 * @description Obtener los datos de una cueva sin los campos poblados
 * @param caveId id de la cueva
 * @returns content: Datos de la cueva planos
 */

export async function getPlainCave(caveId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const cave = await Cave.findById(caveId).exec()
    if (!cave) throw new Error('Cavidad no encontrado')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const cavePOJO = JSON.parse(JSON.stringify(cave))

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
 * @type Interface de retorno de la función getPlainCave
 */

export interface PlainCave extends Omit<CaveDocument, 'system' | 'instances'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  system?: string
  instances: string[]
}
