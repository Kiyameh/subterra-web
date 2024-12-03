'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import Instance, {
  InstanceDocument,
  PopulatedInstance,
} from '@/database/models/Instance.model'
import {Answer} from '@/database/types/answer.type'
import Group from '../models/Group.model'
import User from '../models/User.model'

/**
 * Función para obtener todas las instancias
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: PopulatedInstance[]
 * }
 */

export async function getAllInstances() {
  try {
    await connectToMongoDB()
    const allInstances = await Instance.find()
      .populate({path: 'coordinator', model: User})
      .populate({path: 'owner', model: Group})
      .populate({path: 'editors', model: User})
      .populate({path: 'viewers', model: User})
      .exec()
    const allInstancesPOJO = allInstances.map((instance) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(instance))
    })
    return {
      ok: true,
      code: 200,
      message: 'Instancias obtenidas',
      content: allInstancesPOJO as PopulatedInstance[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

export async function getSomeInstances(ids: string[]) {
  try {
    await connectToMongoDB()
    const someInstances = await Instance.find({
      _id: {$in: ids},
    })
      .populate({path: 'coordinator', model: User})
      .populate({path: 'owner', model: Group})
      .populate({path: 'editors', model: User})
      .populate({path: 'viewers', model: User})
      .exec()
    const someInstancesPOJO = someInstances.map((instance) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(instance))
    })
    return {
      ok: true,
      code: 200,
      message: 'Instancias obtenidas',
      content: someInstancesPOJO as PopulatedInstance[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * Función para obtener una instancia
 * @param name <string> nombre de la instancia
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: PopulatedInstance
 * }
 */

export async function getInstanceByName(name: string) {
  try {
    await connectToMongoDB()
    const instance: InstanceDocument = await Instance.findOne({
      name: name,
    })
      .populate({path: 'coordinator', model: User})
      .populate({path: 'owner', model: Group})
      .populate({path: 'editors', model: User})
      .populate({path: 'viewers', model: User})
      .exec()
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const instancePOJO = JSON.parse(JSON.stringify(instance))
    return {
      ok: true,
      code: 200,
      message: 'Instancia obtenida',
      content: instancePOJO as PopulatedInstance,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * Función para obtener una instancia por su id
 * @param id <string> id de la instancia
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: PopulatedInstance
 * }
 */
export async function getInstanceById(id: string) {
  try {
    await connectToMongoDB()
    const instance: InstanceDocument = await Instance.findOne({
      _id: id,
    })
      .populate({path: 'coordinator', model: User})
      .populate({path: 'owner', model: Group})
      .populate({path: 'editors', model: User})
      .populate({path: 'viewers', model: User})
      .exec()
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const instancePOJO = JSON.parse(JSON.stringify(instance))
    return {
      ok: true,
      code: 200,
      message: 'Instancia obtenida',
      content: instancePOJO as PopulatedInstance,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}
