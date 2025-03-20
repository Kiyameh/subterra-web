'use server'
import {redirect, RedirectType} from 'next/navigation'

import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Exploration from '@/database/models/Exploration.model'
import {
  ExplorationFormValues,
  ExplorationSchema,
} from '@/database/types/Exploration'

import Cave from '@/database/models/Cave.model'
import {CaveDocument} from '@/database/types/Cave'

import Group from '@/database/models/Group.model'
import {GroupDocument} from '@/database/models/Group.model'
import {GroupObject} from '@/database/services/Group/getOneGroup'

import Instance from '@/database/models/Instance.model'
import {PlainCave} from '@/database/services/cave.actions'
import {ExplorationDocument} from '@/database/types/Exploration'

//* 1. Funciones de escritura */

/**
 * @version 1
 * @description Crea una nueva exploración en la base de datos
 * @param values datos del formulario
 * @IMPORTANT incluir instanceId en values y/o systemId
 * @param commanderId id del usuario que crea la exploración
 */

export async function createExploration(
  values: ExplorationFormValues,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await ExplorationSchema.parseAsync(values)
    if (!validated || !commanderId || !values.instances[0])
      throw new Error('Datos no válidos')

    // TODO: Si en un futuro habrá más de una instancia por exploración, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, values.instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Guardar la exploración en la base de datos
    await connectToMongoDB()
    const newExploration = new Exploration(validated)
    const savedExploration = await newExploration.save()

    if (!savedExploration) {
      throw new Error('Error al guardar la exploración')
    }

    return {
      ok: true,
      message: 'Exploración creada',
      _id: newExploration._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Actualiza los datos de una exploración en la base de datos
 * @param values datos del formulario
 * @param explorationId id de la exploración a actualizar
 * @param commanderId id del usuario que actualiza la exploración
 */

export async function updateExploration(
  values: ExplorationFormValues,
  explorationId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await ExplorationSchema.parseAsync(values)
    if (!validated || !commanderId || !values.instances[0])
      throw new Error('Datos no válidos')

    // TODO: Si en un futuro habrá más de una instancia por exploración, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, values.instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Actualizar la exploración:
    await connectToMongoDB()
    const updatedExploration = await Exploration.findByIdAndUpdate(
      explorationId,
      values,
      {new: true}
    )
    if (!updatedExploration)
      throw new Error('Error al actualizar la exploración')

    return {
      ok: true,
      message: 'Exploración actualizada',
      _id: updatedExploration._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Elimina una exploración de la base de datos
 * @param explorationId id de la exploración a eliminar
 * @param commanderId id del usuario que elimina la cueva
 */

export async function deleteExploration(
  explorationId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Comprobar si el commander es editor de la instancia
    await connectToMongoDB()
    const instances = (
      await Exploration.findOne({_id: explorationId}).select('instances').exec()
    )?.instances

    // TODO: Si en un futuro habrá más de una instancia por exploración, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    const deletedExploration =
      await Exploration.findByIdAndDelete(explorationId)
    if (!deletedExploration) throw new Error('Exploración no encontrada')
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al eliminar la exploración',
    } as Answer
  } finally {
    //* Redirigir a la lista de exploraciones
    redirect('/list', RedirectType.push)
  }
}

//* 2. Acciones de consulta */

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
 * @description Obtiene los datos de una exploración
 * @param explorationId id de la exploración
 * @returns content: Datos de la exploración con caves y group poblados
 */

export async function getPopulatedExploration(
  explorationId: string
): Promise<Answer> {
  try {
    await connectToMongoDB()
    const exploration = await Exploration.findById(explorationId)
      .populate({path: 'caves', model: Cave})
      .populate({path: 'groups', model: Group})
      .exec()
    if (!exploration) throw new Error('Exploración no encontrada')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const explorationPOJO = JSON.parse(JSON.stringify(exploration))

    return {
      ok: true,
      message: 'Exploración obtenida',
      content: explorationPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @typo Interfaz de retorno de la función getPopulatedExploration
 */

export interface PopulatedExploration
  extends Omit<ExplorationDocument, 'caves' | 'instances' | 'groups'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances?: string[]
  // Poblados:
  caves: PlainCave[]
  groups?: GroupObject[]
}

/**
 * @version 1
 * @description Obtiene los datos de una exploración sin los campos poblados
 * @param explorationId id de la exploración
 * @returns content: Datos de la exploración planos
 */

export async function getPlainExploration(
  explorationId: string
): Promise<Answer> {
  try {
    await connectToMongoDB()
    const exploration = await Exploration.findById(explorationId).exec()
    if (!exploration) throw new Error('Exploración no encontrada')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const explorationPOJO = JSON.parse(JSON.stringify(exploration))

    return {
      ok: true,
      message: 'Exploración obtenida',
      content: explorationPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Interface de retorno de la función getPlainExploration
 */

export interface PlainExploration
  extends Omit<ExplorationDocument, 'caves' | 'instances' | 'groups'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances: string[]

  // poblados:
  caves: string[]
  groups: string[]
}
