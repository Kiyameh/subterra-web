'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {type Answer} from '@/database/types/Answer'

import Cave from '@/database/models/Cave.model'
import System from '@/database/models/System.model'
import Instance from '@/database/models/Instance.model'
import {type CaveDocument} from '@/database/types/Cave'
import {type SystemDocument} from '@/database/types/System'

/**
 * @type Interface de retorno de la función getSystemIndex
 */

export interface SystemIndex
  extends Pick<
    SystemDocument,
    '_id' | 'catalog' | 'initials' | 'name' | 'depth' | 'length' | 'regulations'
  > {
  caves: Pick<CaveDocument, '_id' | 'name'>[]
}

/**
 * @version 1
 * @description Obtener el índice de sistemas de una instancia
 * @param instanceName Nombre de la instancia
 * @returns content Índice de sistemas con los campos _id, catalog, initials, name, caves
 */

export async function getSystemIndex(instanceName: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const instance = await Instance.findOne({name: instanceName})
      .select('_id')
      .exec()

    // Obtener índices de sistemas:

    const systems = await System.find({instances: {$in: [instance?._id]}})
      .select('_id catalog initials name depth length regulations')
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const systemIndexPOJO = systems.map((system) => {
      return JSON.parse(JSON.stringify(system))
    })

    // Insertar las refs de cuevas:
    for (const system of systemIndexPOJO) {
      // Buscar cuevas del sistema:
      const caves = await Cave.find({system: system._id})
        .select('_id name')
        .exec()

      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      const cavesPOJO = caves.map((cave) => {
        return JSON.parse(JSON.stringify(cave))
      })

      system.caves = cavesPOJO
    }

    return {
      ok: true,
      message: 'Índice de sistemas obtenido',
      content: systemIndexPOJO,
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}
