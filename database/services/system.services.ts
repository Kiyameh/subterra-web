'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/answer.type'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {checkIsEditor} from './instance.services'
import {SystemFormSchema, SystemFormValues} from '../validation/system.schemas'
import System from '../models/System.model'
import Cave from '../models/Cave.model'

//* 1. Funciones de escritura */

/**
 * @version 1
 * @description Crea un nuevo sistema en la base de datos
 * @param values datos del formulario
 * @param instanceName Nombre de la instancia a la que pertenece el sistema
 * @param commanderId id del usuario que crea el sistema
 * @returns redirect: `/system/[systemId]`
 */

export async function createSystem(
  values: SystemFormValues,
  instanceName: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await SystemFormSchema.parseAsync(values)
    if (!validated || !commanderId) {
      return {ok: false, message: 'Datos no válidos'} as Answer
    }

    // Comprobar si el commander es editor de la instancia
    const isEditor = checkIsEditor(commanderId, instanceName)
    if (!isEditor) throw new Error('El usuario no es editor de la instancia')

    // Crear el nuevo sistema en memoria:
    const newSystem = new System(values)

    await connectToMongoDB()
    const savedSystem = await newSystem.save()

    return {
      ok: true,
      message: 'Sistema creado',
      redirect: `/system/${savedSystem._id}`,
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Actualiza los datos de un sistema en la base de datos
 * @param values datos del formulario
 * @param systemId id del sistema a actualizar
 * @param instanceName Nombre de la instancia a la que pertenece el sistema
 * @param commanderId id del usuario que actualiza el sistema
 * @returns redirect: `/system/[systemId]`
 */

export async function updateSystem(
  values: SystemFormValues,
  systemId: string,
  instanceName: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await SystemFormSchema.parseAsync(values)
    if (!validated || !commanderId) {
      return {ok: false, message: 'Datos no válidos'} as Answer
    }

    // Comprobar si el commander es editor de la instancia
    const isEditor = checkIsEditor(commanderId, instanceName)
    if (!isEditor) throw new Error('El usuario no es editor de la instancia')

    // Actualizar el sistema en memoria:
    await connectToMongoDB()
    const updatedSystem = await System.findByIdAndUpdate(systemId, values, {
      new: true,
    })

    return {
      ok: true,
      message: 'Sistema actualizado',
      redirect: `/system/${updatedSystem._id}`,
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

//* 2. Funciones de consulta */

/**
 * @version 1
 * @description Obtener el índice de sistemas de una instancia
 * @param instanceName Nombre de la instancia
 * @returns content Índice de sistemas con los campos _id, catalog, initials, name, caves
 */

export async function getSystemIndex(instanceName: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const systems = await System.find({instance: instanceName})
      .select('_id catalog initials name caves')
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const systemIndexPOJO = systems.map((system) => {
      return JSON.parse(JSON.stringify(system))
    })

    return {
      ok: true,
      message: 'Índice de sistemas obtenido',
      content: systemIndexPOJO,
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Obtener los datos de un sistema
 * @param systemId id del sistema
 * @returns content Datos del sistema
 */

export async function getOneSystem(systemId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const system = await System.findById(systemId)
      .populate({path: 'caves', model: Cave})
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const systemPOJO = JSON.parse(JSON.stringify(system))

    return {
      ok: true,
      message: 'Sistema obtenido',
      content: systemPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
