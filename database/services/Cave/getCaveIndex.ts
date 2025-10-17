'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Cave from '@/database/models/Cave.model'
import System from '@/database/models/System.model'
import Instance from '@/database/models/Instance.model'

import {type CaveDocument} from '@/database/types/Cave'
import {type SystemDocument} from '@/database/types/System'

/**
 * @version 1
 * @description Obtener el índice de cuevas de una instancia
 * @param instanceName Nombre de la instancia
 * @returns content: Índice de cuevas con los campos _id, catalog, initials, name, system, instances y cave_shapes
 */

export async function getCaveIndex(instanceName: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const instance = await Instance.findOne({name: instanceName})
      .select('_id')
      .exec()
    const caves = await Cave.find({instances: {$in: [instance?._id]}})
      .select(
        '_id catalog initials name system length depth regulations massif location_confirmed'
      )
      .populate({
        path: 'system',
        select: 'name _id',
        model: System,
      })
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const cavesIndexPOJO = caves.map((cave) => {
      return JSON.parse(JSON.stringify(cave))
    })

    return {
      ok: true,
      message: 'Índice de cuevas obtenido',
      content: cavesIndexPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Interface de retorno de la función getCaveIndex
 */

export interface CaveIndex
  extends Pick<
    CaveDocument,
    | '_id'
    | 'catalog'
    | 'initials'
    | 'name'
    | 'length'
    | 'depth'
    | 'regulations'
    | 'massif'
    | 'location_confirmed'
  > {
  system: Pick<SystemDocument, '_id' | 'name'>
}
