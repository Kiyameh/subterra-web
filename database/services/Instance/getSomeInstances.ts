'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Group from '@/database/models/Group.model'
import {type UserIndex} from '@/database/models/User.model'

import Instance from '@/database/models/Instance.model'
import {type InstanceWithOwner} from './getAllInstances'
import {getInstanceUsers} from './getInstanceUsers'

/**
 * @type Interface de retorno de la función getSomeInstances y getOneInstance
 */

export interface InstanceWithUsers extends InstanceWithOwner {
  editors: UserIndex[]
  coordinators: UserIndex[]
  viewers: UserIndex[]
}

/**
 * @version 2
 * @description Función para obtener algunas instancias
 * @param ids string[] (Array de ids de instancias)
 * @returns content: Instancias
 */

export async function getSomeInstances(ids: string[] | undefined) {
  try {
    await connectToMongoDB()
    const instances = await Instance.find({
      _id: {$in: ids},
    })
      .populate({
        path: 'owner',
        select: '_id name fullname province',
        model: Group,
      })
      .exec()

    const withUsers = await Promise.all(
      instances.map(async (instance) => {
        const {editors, coordinators, viewers} = await getInstanceUsers(
          instance._id
        )
        return {
          ...instance.toObject(),
          editors,
          coordinators,
          viewers,
        }
      })
    )

    const someInstancesPOJO = withUsers.map((instance) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(instance))
    })

    return {
      ok: true,
      message: 'Instancias obtenidas',
      content: someInstancesPOJO as InstanceWithUsers[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
