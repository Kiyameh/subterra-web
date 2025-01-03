'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/answer.type'

import Group from '@/database/models/Group.model'
import User, {UserIndex} from '@/database/models/User.model'
import Platform from '@/database/models/Platform.model'
import {PlatformDocument} from '@/database/models/Platform.model'

import Instance from '@/database/models/Instance.model'
import {InstanceDocument} from '@/database/models/Instance.model'

import {InstanceFormValues} from '@/database/validation/instance.schemas'
import {InstanceFormSchema} from '@/database/validation/instance.schemas'
import {UpdateInstanceFormValues} from '@/database/validation/instance.schemas'
import {UpdateInstanceFormSchema} from '@/database/validation/instance.schemas'
import Cave from '@/database/models/Cave.model'
import System from '@/database/models/System.model'
import Exploration from '@/database/models/Exploration.model'
import {GroupIndex} from './group.actions'

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
    if (!validated || !commanderId) throw new Error('Datos no validos')

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

    const {coordinator, ...instanceValues} = values

    // Crear nueva instancia con los valores:
    const newInstance = new Instance(instanceValues)

    // Obtener el usuario coordinador e insertar instancia:
    const updatedUser = await User.findOneAndUpdate(
      {_id: coordinator},
      {$push: {editorOf: newInstance._id, coordinatorOf: newInstance._id}},
      {session: session}
    )

    // Guardar la nueva instancia:
    const savedInstance = await newInstance.save({session: session})

    if (!savedInstance || !updatedUser) {
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

/**
 * @version 1
 * @description Función para actualizar una instancia
 * @param values datos de formulario
 * @param instanceId _id de la instancia
 * @param commanderId _id del usuario que edita
 */

export async function updateInstance(
  values: UpdateInstanceFormValues,
  instanceId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await UpdateInstanceFormSchema.parseAsync(values)
    if (!validated) {
      return {ok: false, message: 'Datos no validos'} as Answer
    }

    // Obtener instancia a editar:
    await connectToMongoDB()
    const instanceToUpdate = await Instance.findById(instanceId)
    if (!instanceToUpdate) throw new Error('Instancia no encontrada')

    // Comprobar si el usuario es coordinador de la instancia
    const commanderIsCoordinator = await checkIsCoordinator(
      commanderId,
      instanceToUpdate.name
    )
    if (!commanderIsCoordinator)
      throw new Error('No es coordinador de instancia')

    // Actualización de la instancia:
    Object.assign(instanceToUpdate, values)
    await instanceToUpdate.save()

    return {
      ok: true,
      message: 'Instancia actualizada',
      redirect: `/instance/${instanceToUpdate.name}`,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

//* 2. Funciones de consulta */

/**
 * @version 1
 * @description Función para obtener el id de una instancia por su nombre
 * @param instanceName  nombre de la instancia
 * @returns id de la instancia
 */

export async function getInstanceId(
  instanceName: string
): Promise<string | null> {
  try {
    await connectToMongoDB()
    const instance = await Instance.findOne({
      name: instanceName,
    })
      .select('_id')
      .exec()

    if (!instance) throw new Error('Instancia no encontrada')
    return instance._id.toString()
  } catch (error) {
    console.error(error)
    return null
  }
}

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

async function getInstanceUsers(instanceId: string) {
  try {
    await connectToMongoDB()
    const editors = await User.find({
      editorOf: {$in: [instanceId]},
    })
      .select('_id name fullname image email')
      .exec()

    const coordinators = await User.find({
      coordinatorOf: {$in: [instanceId]},
    })
      .select('_id name fullname image email')
      .exec()

    const viewers = await User.find({
      viewerOf: {$in: [instanceId]},
    })
      .select('_id name fullname image email')
      .exec()

    return {editors, coordinators, viewers}
  } catch (error) {
    console.error(error)
    return {editors: [], coordinators: [], viewers: []}
  }
}

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

/**
 * @version 1
 * @description Función para obtener las estadisticas de una instancia
 * @param instanceId string (id de la instancia)
 */

export async function getInstanceStats(instanceId: string) {
  try {
    await connectToMongoDB()
    const numberOfCaves = await Cave.countDocuments({
      instances: {$in: [instanceId]},
    })
    const numberOfSystems = await System.countDocuments({
      instances: {$in: [instanceId]},
    })
    const numberOfExplorations = await Exploration.countDocuments({
      instances: {$in: [instanceId]},
    })

    return {
      ok: true,
      message: 'Estadisticas obtenidas',
      content: {
        numberOfCaves,
        numberOfSystems,
        numberOfExplorations,
      },
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
  userId: string | undefined | null,
  instanceName?: string | null,
  instanceId?: string | null
): Promise<boolean> {
  try {
    await connectToMongoDB()

    if (!instanceId) {
      const instance = await Instance.findOne({name: instanceName})
        .select('_id')
        .exec()
      instanceId = instance?._id
    }

    const matchingEditor = await User.findOne({
      _id: userId,
      editorOf: {$in: instanceId},
    })

    if (!matchingEditor) return false
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * @version 1
 * @description Función para comprobar si un usuario es coordinador de una instancia
 * @param instanceName nombre de la instancia
 * @param userId _id del usuario
 */

export async function checkIsCoordinator(
  userId: string | undefined | null,
  instanceName: string
): Promise<boolean> {
  try {
    await connectToMongoDB()

    const instanceId = await Instance.findOne({name: instanceName})
      .select('_id')
      .exec()

    const matchingCoordinator = await User.findOne({
      _id: userId,
      coordinatorOf: {$in: instanceId},
    })
      .select('_id')
      .exec()

    if (!matchingCoordinator) return false
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * @version 2
 * @description Función para añadir un editor a una instancia
 * @param instanceId _id de la instancia
 * @param userId _id del usuario
 */

export async function addEditor(instanceId: string, userId: string | null) {
  try {
    await connectToMongoDB()

    // TODO: Validar commander

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {editorOf: instanceId},
      },
      {new: true}
    )

    if (!updatedUser) throw new Error('Error al añadir editor')

    return {ok: true, message: 'Editor añadido'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 2
 * @description Función para eliminasr un editor de una instancia
 * @param instanceId _id de la instancia
 * @param userId _id del usuario
 *
 */

export async function removeEditor(instanceId: string, userId: string | null) {
  try {
    await connectToMongoDB()

    // TODO: Validar commander

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {editorOf: instanceId},
      },
      {new: true}
    )

    if (!updatedUser) throw new Error('Error al eliminar editor')

    return {ok: true, message: 'Editor eliminado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 2
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

    // TODO: Validar commander

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {coordinatorOf: instanceId},
      },
      {new: true}
    )

    if (!updatedUser) throw new Error('Error al promocionar coordinador')

    return {ok: true, message: 'Editor promocionado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 2
 * @description Función para degradar un coordinador a editor
 * @param instanceId _id de la instancia
 * @param userId _id del usuario
 */

export async function demoteCoordinator(
  instanceId: string,
  userId: string | null
) {
  try {
    await connectToMongoDB()

    // TODO: Validar commander

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {coordinatorOf: instanceId},
      },
      {new: true}
    )

    if (!updatedUser) throw new Error('Error al degradar coordinador')

    return {ok: true, message: 'Coordinador degradado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
