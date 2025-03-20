'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import Exploration from '@/database/models/Exploration.model'

import Cave from '@/database/models/Cave.model'
import {CaveDocument} from '@/database/types/Cave'

import Group from '@/database/models/Group.model'
import {GroupDocument} from '@/database/models/Group.model'

import Instance from '@/database/models/Instance.model'
import {ExplorationDocument} from '@/database/types/Exploration'

/**
 * @type Interface de retorno de la función getExplorationsIndex
 */

export interface ExplorationIndex
  extends Pick<ExplorationDocument, '_id' | 'name' | 'dates' | 'cave_time'> {
  caves?: Pick<CaveDocument, '_id' | 'name'>[]
  groups?: Pick<GroupDocument, '_id' | 'name'>[]
}

/**
 * @version 1
 * @description Obtiene el índice de exploraciones de una instancia
 * @param instanceName Nombre de la instancia
 * @returns content: Índice de exploraciones con los campos _id, name, dates, caves
 */

export async function getExplorationsIndex(
  instanceName: string
): Promise<Answer> {
  try {
    await connectToMongoDB()
    const instance = await Instance.findOne({name: instanceName})
      .select('_id')
      .exec()

    // Obtener índice de exploraciones:
    const explorations = await Exploration.find({
      instances: {$in: [instance?._id]},
    })
      .select('_id name dates caves groups cave_time')
      .populate({
        path: 'caves',
        select: 'name _id',
        model: Cave,
      })
      .populate({
        path: 'groups',
        select: 'name _id',
        model: Group,
      })
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const explorationsPOJO = explorations.map((exploration) => {
      return JSON.parse(JSON.stringify(exploration))
    })

    return {
      ok: true,
      message: 'Índice de exploraciones obtenido',
      content: explorationsPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
