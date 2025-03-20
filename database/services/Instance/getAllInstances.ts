'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'

import Group from '@/database/models/Group.model'
import {GroupIndex} from '@/database/services/Group/getGroupsIndex'

import Instance from '@/database/models/Instance.model'
import {InstanceDocument} from '@/database/models/Instance.model'

/**
 * @version 2
 * @description Función para obtener todas las instancias
 * @returns content: Instancias con el campo owner poblados como índice
 */

export async function getAllInstances() {
  try {
    await connectToMongoDB()
    const allInstances = await Instance.find()
      .populate({
        path: 'owner',
        select: '_id name fullname province',
        model: Group,
      })
      .exec()

    const allInstancesPOJO = allInstances.map((instance) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(instance))
    })
    return {
      ok: true,
      message: 'Instancias obtenidas',
      content: allInstancesPOJO as InstanceWithOwner[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Interface de retorno de la función getAllInstances
 */

export interface InstanceObject extends Omit<InstanceDocument, 'owner'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  owner: string
}
export interface InstanceWithOwner extends Omit<InstanceObject, 'owner'> {
  owner: GroupIndex
}
