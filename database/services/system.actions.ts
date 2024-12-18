'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Answer} from '@/database/types/answer.type'
import {checkIsEditor} from './instance.services'

import Cave from '@/database/models/Cave.model'
import {CaveDocument} from '@/database/models/Cave.model'

import System from '@/database/models/System.model'
import {SystemDocument} from '@/database/models/System.model'
import {SystemFormValues} from '../validation/system.schemas'
import {SystemFormSchema} from '../validation/system.schemas'

import Instance from '../models/Instance.model'
import {PlainCave} from './cave.actions'
import {redirect, RedirectType} from 'next/navigation'

//* 1. Funciones de escritura */

/**
 * @version 2
 * @description Crea un nuevo sistema en la base de datos
 * @param values datos del formulario
 * @IMPORTANT incluir instanceId en values y/o systemId
 * @param commanderId id del usuario que crea la cueva
 */

export async function createSystem(
  values: SystemFormValues,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await SystemFormSchema.parseAsync(values)
    if (!validated || !commanderId || !values.instances[0])
      throw new Error('Datos no válidos')

    // Comprobar si el commander es editor de la instancia
    const isEditor = checkIsEditor(commanderId, null, values.instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Crear sistema:
    await connectToMongoDB()
    const newSystem = new System(validated)

    const savedSystem = await newSystem.save()
    if (!savedSystem) throw new Error('Error al guardar el sistema')

    return {
      ok: true,
      message: 'Sistema creado',
      _id: savedSystem._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 2
 * @description Actualiza los datos de un sistema en la base de datos
 * @param values datos del formulario
 * @param caveId id del sistema a actualizar
 * @param commanderId id del usuario que actualiza el sistema
 */

export async function updateSystem(
  values: SystemFormValues,
  systemId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await SystemFormSchema.parseAsync(values)
    if (!validated || !commanderId || !values.instances[0])
      throw new Error('Datos no válidos')

    // Comprobar si el commander es editor de la instancia
    const isEditor = checkIsEditor(commanderId, null, values.instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Actualizar el sistema en memoria:
    await connectToMongoDB()
    const updatedSystem = await System.findByIdAndUpdate(systemId, values, {
      new: true,
    })
    if (!updatedSystem) throw new Error('Error al actualizar el sistema')

    return {
      ok: true,
      message: 'Sistema actualizado',
      _id: updatedSystem._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Elimina un sistema de la base de datos
 * @param systemId id del sistema a eliminar
 * @param commanderId id del usuario que elimina la cueva
 */

export async function deleteSystem(
  systemId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Comprobar si el commander es editor de la instancia
    await connectToMongoDB()
    const instances = (
      await System.findOne({_id: systemId}).select('instances').exec()
    )?.instances

    // TODO: Si en un futuro habrá más de una instancia por exploración, cambiar el método de comprobación
    const isEditor = checkIsEditor(commanderId, null, instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Eliminar el sistema:
    const deletedSystem = await System.findByIdAndDelete(systemId)
    if (!deletedSystem) throw new Error('Error al eliminar la cueva')
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al eliminar el sistema',
    } as Answer
  } finally {
    //* Redirigir a la lista de sistemas
    redirect('/list', RedirectType.push)
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
    const instance = await Instance.findOne({name: instanceName})
      .select('_id')
      .exec()

    // Obtener índices de sistemas:

    const systems = await System.find({instances: {$in: [instance?._id]}})
      .select('_id catalog initials name depth length regulations')
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const systemIndexPOJO = systems.map((system) => {
      return JSON.parse(JSON.stringify(system))
    })

    // Insertar las refs de cuevas:
    for (const system of systemIndexPOJO) {
      // Buscar cuevas del sistema:
      const caves = await Cave.find({system: system._id})
        .select('_id name')
        .exec()

      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      const cavesPOJO = caves.map((cave) => {
        return JSON.parse(JSON.stringify(cave))
      })

      system.caves = cavesPOJO
    }

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
 * @type Interface de retorno de la función getSystemIndex
 */
export interface SystemIndex
  extends Pick<
    SystemDocument,
    '_id' | 'catalog' | 'initials' | 'name' | 'depth' | 'length' | 'regulations'
  > {
  caves: Pick<CaveDocument, '_id' | 'name'>[]
}

/**
 * @version 1
 * @description Obtener los datos de un sistema
 * @param systemId id del sistema
 * @returns content Datos del sistema
 */

export async function getPopulatedSystem(systemId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const system = await System.findById(systemId).exec()
    if (!system) throw new Error('Sistema no encontrado')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const systemPOJO = JSON.parse(JSON.stringify(system))

    // Insertar cavidades:
    const caves = await Cave.find({system: systemId})
    const cavesPOJO = caves.map((cave) => {
      return JSON.parse(JSON.stringify(cave))
    })

    systemPOJO.caves = cavesPOJO

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

/**
 * @type Interface de retorno de la función getOneSystem
 */

export interface PopulatedSystem extends Omit<SystemDocument, 'instances'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances?: string[]
  // insertados:
  caves: PlainCave[]
}

/**
 * @version 1
 * @description Obtener los datos de un sistema sin los campos poblados
 * @param systemId id del sistema
 * @returns content Datos del sistema plano
 */

export async function getPlainSystem(systemId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const system = await System.findById(systemId).exec()

    if (!system) throw new Error('Sistema no encontrado')

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

/*
 * @type Interface de retorno de la función getPlainSystem
 */

export interface PlainSystem extends Omit<SystemDocument, 'instances'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances: string[]
  // insertados:
  caves: PlainCave[]
}
