'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/answer.type'

import Group from '@/database/models/Group.model'
import User from '@/database/models/User.model'
import Platform from '../models/Platform.model'
import {PlatformDocument} from '../models/Platform.model'

import Instance, {InstanceIndex} from '@/database/models/Instance.model'
import {InstanceDocument} from '@/database/models/Instance.model'
import {PopulatedInstance} from '@/database/models/Instance.model'

import {InstanceFormValues} from '@/database/validation/instance.schemas'
import {InstanceFormSchema} from '@/database/validation/instance.schemas'

//* 1. Funciones de escritura */

/**
 * @version 1
 * @description Función para crear una nueva instancia
 * @param values InstanceFormValues (Incluidos owner y coordinator)
 * @param commanderId string (Miembro del staff)
 */

export async function createInstance(
  values: InstanceFormValues,
  commanderId: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await InstanceFormSchema.parseAsync(values)
    if (!validated) {
      return {ok: false, message: 'Datos no validos'} as Answer
    }

    // Validar staff
    await connectToMongoDB()
    const subterra: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    const isStaff = subterra?.checkIsStaff(commanderId)
    if (!isStaff) throw new Error('No es staff de Subterra')

    // Iniciar transacción para garantizar la integridad de los datos
    //? https://mongoosejs.com/docs/transactions.html

    const conection = await connectToMongoDB()
    const session = await conection.startSession()
    session.startTransaction()

    // Crear nueva instancia con los valores:
    const newInstance = new Instance(values)

    // Obtener el grupo owner e insertar instancia:
    const group = await Group.findOne({_id: values.owner})
    const owner = group.pushInstance(newInstance._id, session)

    // Obtener el usuario coordinador e insertar instancia:
    const user = await User.findOne({_id: values.coordinator})
    const coordinator = user.pushCoordinatorOf(newInstance._id, session)

    // Guardar la nueva instancia:
    const savedInstance = await newInstance.save({session: session})

    if (!savedInstance || !owner || !coordinator) {
      session.abortTransaction()
      session.endSession()
      throw new Error('Error al guardar la instancia')
    }

    await session.commitTransaction()
    session.endSession()

    return {
      ok: true,
      message: 'Instancia creada correctamente',
    } as Answer
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Algo ha ido mal, consulta el error',
    } as Answer
  }
}

//* 2. Funciones de consulta */

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
 * @version 1
 * @description Función para obtener todas las instancias
 * @returns content: Todas las instancias con los campos coordinator, owner, editor y viewers poblados como índice
 */

export async function getAllInstances() {
  try {
    await connectToMongoDB()
    const allInstances = await Instance.find()
      .populate({
        path: 'coordinator',
        select: '_id name fullname image',
        model: User,
      })
      .populate({
        path: 'owner',
        select: '_id name fullname province',
        model: Group,
      })
      .populate({
        path: 'editors',
        select: '_id name fullname image',
        model: User,
      })
      .populate({
        path: 'viewers',
        select: '_id name fullname image',
        model: User,
      })
      .exec()
    const allInstancesPOJO = allInstances.map((instance) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(instance))
    })
    return {
      ok: true,
      message: 'Instancias obtenidas',
      content: allInstancesPOJO as PopulatedInstance[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para obtener algunas instancias
 * @param ids string[] (Array de ids de instancias)
 * @returns content: Instancias con los campos coordinator, owner, editor y viewers poblados como índice
 */

export async function getSomeInstances(ids: string[] | undefined) {
  try {
    await connectToMongoDB()
    const someInstances = await Instance.find({
      _id: {$in: ids},
    })
      .populate({
        path: 'coordinator',
        select: '_id name fullname image',
        model: User,
      })
      .populate({
        path: 'owner',
        select: '_id name fullname province',
        model: Group,
      })
      .populate({
        path: 'editors',
        select: '_id name fullname image',
        model: User,
      })
      .populate({
        path: 'viewers',
        select: '_id name fullname image',
        model: User,
      })
      .exec()
    const someInstancesPOJO = someInstances.map((instance) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(instance))
    })
    return {
      ok: true,
      message: 'Instancias obtenidas',
      content: someInstancesPOJO as PopulatedInstance[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para obtener una instancia por su nombre
 * @param name string (Nombre de la instancia)
 * @returns content: Instancia con los campos coordinator, owner, editor y viewers poblados como índice
 */

export async function getOneInstance(name: string) {
  try {
    await connectToMongoDB()
    const instance: InstanceDocument | null = await Instance.findOne({
      name: name,
    })
      .populate({
        path: 'coordinator',
        select: '_id name fullname image email',
        model: User,
      })
      .populate({
        path: 'owner',
        select: '_id name fullname province',
        model: Group,
      })
      .populate({
        path: 'editors',
        select: '_id name fullname image  email',
        model: User,
      })
      .populate({
        path: 'viewers',
        select: '_id name fullname image  email',
        model: User,
      })
      .exec()
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const instancePOJO = JSON.parse(JSON.stringify(instance))
    return {
      ok: true,
      message: 'Instancia obtenida',
      content: instancePOJO as PopulatedInstance,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

//* 3. Funciones de membresía */

/**
 * @version 1
 * @description Función para comprobar si un usuario es editor de una instancia
 * @param instanceName nombre de la instancia
 * @param userId _id del usuario
 */
export async function checkIsEditor(
  instanceName: string,
  userId: string | undefined | null
) {
  try {
    await connectToMongoDB()
    const matchingInstance: InstanceDocument | null = await Instance.findOne({
      name: instanceName,
      editors: {$in: [userId]},
    })
    if (!matchingInstance) {
      return {ok: false, message: 'No eres editor'} as Answer
    }
    return {ok: true, message: 'Eres editor'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para comprobar si un usuario es coordinador de una instancia
 * @param instanceName nombre de la instancia
 * @param userId _id del usuario
 */

export async function checkIsCoordinator(
  instanceName: string,
  userId: string | undefined | null
) {
  try {
    await connectToMongoDB()
    const matchingInstance: InstanceDocument | null = await Instance.findOne({
      name: instanceName,
      coordinator: userId,
    })
    if (!matchingInstance) {
      return {ok: false, message: 'No eres coordinador'} as Answer
    }
    return {ok: true, message: 'Eres coordinador'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para eliminasr un editor de una instancia
 * @param instanceId _id de la instancia
 * @param userId _id del usuario
 *
 */

export async function removeEditor(instanceId: string, userId: string | null) {
  try {
    await connectToMongoDB()
    const instance: InstanceDocument | null =
      await Instance.findById(instanceId)
    if (!instance) throw new Error('Instancia no encontrada')

    const isEditor = await checkIsEditor(instance.name, userId)
    if (!userId || !isEditor.ok)
      throw new Error('No eres editor de esta instancia')

    const updated = await instance.removeEditor(userId)
    if (!updated) throw new Error('Error al eliminar el editor')

    return {ok: true, message: 'Editor eliminado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para promocionar un editor como coordinador
 * @param instanceId _id de la instancia
 * @param userId _id del usuario
 */

export async function promoteCoordinator(
  instanceId: string,
  userId: string | null
) {
  try {
    await connectToMongoDB()
    const instance: InstanceDocument | null =
      await Instance.findById(instanceId)
    if (!instance) throw new Error('Instancia no encontrada')

    const isEditor = await checkIsEditor(instance.name, userId)
    if (!userId || !isEditor.ok)
      throw new Error('No eres editor de esta instancia')

    const updated = await instance.setCoordinator(userId)
    if (!updated) throw new Error('Error al promocionar el editor')

    return {ok: true, message: 'Editor promocionado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
