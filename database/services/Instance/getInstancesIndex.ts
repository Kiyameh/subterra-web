'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'

import Instance from '@/database/models/Instance.model'

/**
 * @version 1
 * @description Función para obtener el índice de instancias
 * @returns content: Índice de instancias con los campos _id, name, fullname, territory e is_online
 */

export async function getInstancesIndex() {
  try {
    await connectToMongoDB()
    const instancesIndex = await Instance.find()
      .select('_id name fullname territory is_online')
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const instancesIndexPOJO = instancesIndex.map((instance) => {
      return JSON.parse(JSON.stringify(instance))
    })

    return {
      ok: true,
      message: 'Índice de instancias obtenido',
      content: instancesIndexPOJO as InstanceIndex[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error desconocido',
    } as Answer
  }
}

/**
 * @type Interface de retorno de la función getInstancesIndex
 */

export interface InstanceIndex {
  _id: string
  name: string
  fullname: string
  territory: string
  is_online: boolean
}
