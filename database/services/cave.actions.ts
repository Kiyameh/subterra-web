'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Answer} from '@/database/types/answer.type'
import {checkIsEditor} from '@/database/services/instance.actions'

import Cave from '@/database/models/Cave.model'
import {CaveDocument} from '@/database/models/Cave.model'
import {CaveFormSchema} from '@/database/validation/cave.schemas'
import {CaveFormValues} from '@/database/validation/cave.schemas'

import System from '@/database/models/System.model'
import {SystemDocument} from '@/database/models/System.model'
import {PlainSystem} from '@/database/services/system.actions'

import Exploration from '@/database/models/Exploration.model'
import {PlainExploration} from '@/database/services/exploration.actions'

import Instance from '@/database/models/Instance.model'
import {redirect, RedirectType} from 'next/navigation'

//* 1. Funciones de escritura */

/**
 * @version 2
 * @description Crea una nueva cueva en la base de datos
 * @param values datos del formulario
 * @IMPORTANT incluir instanceId en values y/o systemId
 * @param commanderId id del usuario que crea la cueva
 */

export async function createCave(
  values: CaveFormValues,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await CaveFormSchema.parseAsync(values)
    if (!validated || !commanderId || !values.instances[0])
      throw new Error('Datos no válidos')

    // TODO: Si en un futuro habrá más de una instancia por cueva, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, values.instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Crear cueva:
    await connectToMongoDB()
    const newCave = new Cave(validated)
    const savedCave = await newCave.save()
    if (!savedCave) throw new Error('Error al guardar la cueva')

    return {
      ok: true,
      message: 'Cueva creada',
      _id: savedCave._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 2
 * @description Actualiza los datos de una cueva en la base de datos
 * @param values datos del formulario
 * @param caveId id de la cueva a actualizar
 * @param commanderId id del usuario que actualiza la cueva
 */

export async function updateCave(
  values: CaveFormValues,
  caveId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await CaveFormSchema.parseAsync(values)
    if (!validated || !commanderId || !values.instances[0])
      throw new Error('Datos no válidos')

    // TODO: Si en un futuro habrá más de una instancia por cueva, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, values.instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Actualizar la cueva:
    await connectToMongoDB()
    const updatedCave = await Cave.findByIdAndUpdate(caveId, values, {
      new: true,
    })
    if (!updatedCave) throw new Error('Error al actualizar la cueva')

    return {
      ok: true,
      message: 'Cueva actualizada',
      _id: updatedCave._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Elimina una cueva de la base de datos
 * @param caveId id de la cueva a eliminar
 * @param commanderId id del usuario que elimina la cueva
 */

export async function deleteCave(
  caveId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Comprobar si el commander es editor de la instancia
    await connectToMongoDB()
    const instances = (
      await Cave.findOne({_id: caveId}).select('instances').exec()
    )?.instances

    // TODO: Si en un futuro habrá más de una instancia por cueva, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Eliminar la cueva:
    const deletedCave = await Cave.findByIdAndDelete(caveId)
    if (!deletedCave) throw new Error('Error al eliminar la cueva')
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al eliminar la cueva',
    } as Answer
  } finally {
    //* Redirigir a la lista de cavidades
    redirect('/list', RedirectType.push)
  }
}

//* 2. Funciones de consulta */

/**
 * @version 1
 * @description Obtener el índice de cuevas combinando las cuevas de dos instancias
 * @param masterId id de la instancia maestra
 * @param branchedId id de la instancia subsidiaria
 */

/* export async function getMergedCaveIndex(masterId: string, branchedId: string) {
  try {
    await connectToMongoDB()

    const masterInstanceCaves = await Cave.find({instances: {$in: [masterId]}})
      .select(
        '_id catalog initials name system length depth regulations massif'
      )
      .populate({
        path: 'system',
        select: 'name _id',
        model: System,
      })
      .exec()

    const branchedInstanceCaves = await CaveBranch.find({
      instances: {$in: [branchedId]},
    })
      .select(
        '_id catalog initials name system length depth regulations massif master_id'
      )
      .populate({
        path: 'system',
        select: 'name _id',
        model: System,
      })
      .exec()

    // Convertir a objeto plano para poder pasar a componentes cliente de Next
    const branchedCavesPOJO = branchedInstanceCaves.map((cave) => {
      return JSON.parse(JSON.stringify(cave))
    })

    const masterCavesPOJO = masterInstanceCaves.map((cave) => {
      return JSON.parse(JSON.stringify(cave))
    })

    if (!masterCavesPOJO || !branchedCavesPOJO)
      throw new Error('Error al obtener las cuevas')

    // Combinar arrays:
    const mergedCaves = mergeDocumentArrays(masterCavesPOJO, branchedCavesPOJO)

    if (!mergedCaves) throw new Error('Error al combinar las cuevas')

    return {
      ok: true,
      message: 'Índice de cuevas obtenido',
      content: mergedCaves,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
} */

/**
 * @version 1
 * @description Obtener el índice de cuevas de una instancia
 * @param instanceName Nombre de la instancia
 * @returns content: Índice de cuevas con los campos _id, catalog, initials, name, system, instances y cave_shapes
 */

export async function getCaveIndex(instanceName: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const instance = await Instance.findOne({name: instanceName})
      .select('_id')
      .exec()
    const caves = await Cave.find({instances: {$in: [instance?._id]}})
      .select(
        '_id catalog initials name system length depth regulations massif'
      )
      .populate({
        path: 'system',
        select: 'name _id',
        model: System,
      })
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const cavesIndexPOJO = caves.map((cave) => {
      return JSON.parse(JSON.stringify(cave))
    })

    return {
      ok: true,
      message: 'Índice de cuevas obtenido',
      content: cavesIndexPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Interface de retorno de la función getCaveIndex
 */

export interface CaveIndex
  extends Pick<
    CaveDocument,
    | '_id'
    | 'catalog'
    | 'initials'
    | 'name'
    | 'length'
    | 'depth'
    | 'regulations'
    | 'massif'
  > {
  system: Pick<SystemDocument, '_id' | 'name'>
}

/**
 * @version 2
 * @description Obtener los datos de una cueva con los campos poblados
 * @param caveId id de la cueva
 * @returns content: Datos de la cueva con system poblado
 */

export async function getPopulatedCave(caveId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const cave = await Cave.findById(caveId)
      .populate({path: 'system', model: System})
      .exec()
    if (!cave) throw new Error('Cavidad no encontrado')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const cavePOJO = JSON.parse(JSON.stringify(cave))

    // Insertar exploraciones:
    const explorations = await Exploration.find({
      caves: {$in: [caveId]},
    })
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const explorationsPOJO = explorations.map((exploration) => {
      return JSON.parse(JSON.stringify(exploration))
    })

    cavePOJO.explorations = explorationsPOJO

    return {
      ok: true,
      message: 'Cueva obtenida',
      content: cavePOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Interface de retorno de la función getPopulatedCave
 */

export interface PopulatedCave
  extends Omit<CaveDocument, 'system' | 'explorations' | 'instances'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances: string[]
  // poblados:
  system: PlainSystem
  // insertados:
  explorations: PlainExploration[]
}
//TODO: Eliminar "explorations" del omit cuando no exista

/**
 * @version 2
 * @description Obtener los datos de una cueva sin los campos poblados
 * @param caveId id de la cueva
 * @returns content: Datos de la cueva planos
 */

export async function getPlainCave(caveId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const cave = await Cave.findById(caveId).exec()
    if (!cave) throw new Error('Cavidad no encontrado')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const cavePOJO = JSON.parse(JSON.stringify(cave))

    return {
      ok: true,
      message: 'Cueva obtenida',
      content: cavePOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Interface de retorno de la función getPlainCave
 */

export interface PlainCave extends Omit<CaveDocument, 'system' | 'instances'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  system?: string
  instances: string[]
}
