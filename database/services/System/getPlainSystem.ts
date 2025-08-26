'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import System from '@/database/models/System.model'
import {type SystemDocument} from '@/database/types/System'
import {type PlainCave} from '@/database/services/Cave/getPlainCave'

/*
 * @type Interface de retorno de la función getPlainSystem
 */

export interface PlainSystem extends Omit<SystemDocument, 'instances'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances: string[]
  // insertados:
  caves: PlainCave[]
}

/**
 * @version 1
 * @description Obtener los datos de un sistema sin los campos poblados
 * @param systemId id del sistema
 * @returns content Datos del sistema plano
 */

export async function getPlainSystem(systemId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const system = await System.findById(systemId).exec()

    if (!system) throw new Error('Sistema no encontrado')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const systemPOJO = JSON.parse(JSON.stringify(system))

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
