'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'

import Group from '@/database/models/Group.model'
import User, {UserIndex} from '@/database/models/User.model'

import Instance from '@/database/models/Instance.model'
import {InstanceDocument} from '@/database/models/Instance.model'
import {InstanceWithOwner} from './getAllInstances'

/**
 * @type Interface de retorno de la función getSomeInstances y getOneInstance
 */

export interface InstanceWithUsers extends InstanceWithOwner {
  editors: UserIndex[]
  coordinators: UserIndex[]
  viewers: UserIndex[]
}

/**
 * @version 1
 * @description Función para obtener una instancia por su nombre
 * @param name string (Nombre de la instancia)
 * @returns content: Instancia con el campo owner poblado como índice
 */

export async function getOneInstance(name: string) {
  try {
    await connectToMongoDB()
    const instance: InstanceDocument | null = await Instance.findOne({
      name: name,
    })
      .populate({
        path: 'owner',
        select: '_id name fullname province',
        model: Group,
      })
      .exec()

    if (!instance) throw new Error('Instancia no encontrada')

    const editors = await User.find({
      editorOf: {$in: [instance._id]},
    })
      .select('_id name fullname image email')
      .exec()

    const coordinators = await User.find({
      coordinatorOf: {$in: [instance._id]},
    })
      .select('_id name fullname image email')
      .exec()

    const viewers = await User.find({
      viewerOf: {$in: [instance._id]},
    })
      .select('_id name fullname image email')
      .exec()

    const populatedInstance = {
      ...instance.toObject(),
      editors,
      coordinators,
      viewers,
    }

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const instancePOJO = JSON.parse(JSON.stringify(populatedInstance))
    return {
      ok: true,
      message: 'Instancia obtenida',
      content: instancePOJO as InstanceWithUsers,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
