'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/answer.type'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {CaveFormSchema, CaveFormValues} from '../validation/cave.schemas'
import Cave from '../models/Cave.model'
import {checkIsEditor} from './instance.services'
import System from '../models/System.model'
import Exploration from '../models/Exploration.model'
import Instance from '../models/Instance.model'

//* 1. Funciones de escritura */

/**
 * @version 1
 * @description Crea una nueva cueva en la base de datos
 * @param values datos del formulario
 * @param instanceName Nombre de la instancia a la que pertenece la cueva
 * @param commanderId id del usuario que crea la cueva
 * @returns redirect: caveId
 */

export async function createCave(
  values: CaveFormValues,
  instanceName: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await CaveFormSchema.parseAsync(values)
    if (!validated || !commanderId) {
      return {ok: false, message: 'Datos no válidos'} as Answer
    }

    // Comprobar si el commander es editor de la instancia
    const isEditor = checkIsEditor(commanderId, instanceName)
    if (!isEditor) throw new Error('El usuario no es editor de la instancia')

    const conection = await connectToMongoDB()

    // Obtener el _id de la instancia
    const instanceId = await Instance.findOne({name: instanceName})
      .select('_id')
      .exec()

    // Crear la nueva cueva en memoria:
    const newCave = new Cave({
      ...values,
      instances: [instanceId],
    })

    const session = await conection.startSession()
    // TODO: Estudiar cual es el retorno de withTransaction

    await session.withTransaction(async () => {
      // Insertar la cueva en el sistema:
      if (values.system) {
        const updatedSystem = await System.findOneAndUpdate(
          {_id: values.system},
          {$push: {caves: newCave._id}},
          {new: true}
        )
        if (!updatedSystem) throw new Error('Error al actualizar el sistema')
      }

      // Guardar la cueva en la base de datos
      const savedCave = await newCave.save()
      if (!savedCave) throw new Error('Error al guardar la cueva')
    })

    session.endSession()

    return {
      ok: true,
      message: 'Cueva creada',
      redirect: newCave._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Actualiza los datos de una cueva en la base de datos
 * @param values datos del formulario
 * @param caveId id de la cueva a actualizar
 * @param instanceName Nombre de la instancia a la que pertenece la cueva
 * @param commanderId id del usuario que actualiza la cueva
 * @returns redirect: `/cave/[caveId]`
 */

export async function updateCave(
  values: CaveFormValues,
  caveId: string,
  instanceName: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validar los datos:
    const validated = await CaveFormSchema.parseAsync(values)
    if (!validated || !commanderId) {
      return {ok: false, message: 'Datos no válidos'} as Answer
    }

    // Comprobar si el commander es editor de la instancia
    const isEditor = checkIsEditor(commanderId, instanceName)
    if (!isEditor) throw new Error('El usuario no es editor de la instancia')

    // Actualizar la cueva en memoria:
    await connectToMongoDB()
    const updatedCave = await Cave.findByIdAndUpdate(caveId, values, {
      new: true,
    })

    return {
      ok: true,
      message: 'Cueva actualizada',
      redirect: `/cave/${updatedCave._id}`,
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}

//* 2. Funciones de consulta */

/**
 * @version 1
 * @description Obtener el índice de cuevas de una instancia
 * @param instanceName Nombre de la instancia
 * @returns content: Índice de cuevas con los campos _id, catalog, initials, name, system, instances y cave_shapes
 *
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
 * @version 1
 * @description Obtener los datos de una cueva
 * @param caveId id de la cueva
 * @returns content: Datos de la cueva con system y exploraciones populados
 */

export async function getOneCave(caveId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const cave = await Cave.findById(caveId)
      .populate({path: 'system', model: System})
      .populate({path: 'explorations', model: Exploration})
      .exec()

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
 * @version 1
 * @description Obtener los datos de varias cuevas
 * @param caveIds Array de ids de cuevas
 * @returns content: Array de datos de cuevas
 */

export async function getSomeCaves(caveIds: string[]): Promise<Answer> {
  try {
    await connectToMongoDB()
    const caves = await Cave.find({_id: {$in: caveIds}}).exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const cavesPOJO = caves.map((cave) => {
      return JSON.parse(JSON.stringify(cave))
    })

    return {
      ok: true,
      message: 'Cuevas obtenidas',
      content: cavesPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

//* 3. Funciones de adición */

/**
 * @version 1
 * @description Añadir una cueva a un sistema
 * @param caveId id de la cueva
 * @param systemId id del sistema
 * @param commanderId: string id del usuario que realiza la acción
 * @param instanceName: string nombre de la instancia
 */

export async function addCaveToSystem(
  caveId: string,
  systemId: string,
  commanderId: string,
  instanceName: string
): Promise<Answer> {
  try {
    // Comprobar si el commander es editor de la instancia
    const isEditor = checkIsEditor(commanderId, instanceName)
    if (!isEditor) throw new Error('El usuario no es editor de la instancia')

    const conection = await connectToMongoDB()

    const cave = await Cave.findById(caveId)
    const system = await System.findById(systemId)

    if (!cave || !system) throw new Error('Cueva o sistema no encontrados')
    const session = await conection.startSession()
    session.startTransaction()

    // Añadir la cueva al sistema
    const updatedSystem = system.pushCave(caveId, session)
    // Añadir el sistema a la cueva
    const updatedCave = cave.setSystem(systemId, session)
    if (!updatedSystem || !updatedCave)
      throw new Error('Error al añadir la cueva al sistema')

    session.commitTransaction()
    session.endSession()

    return {
      ok: true,
      message: 'Cueva añadida al sistema',
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Eliminar una cueva de un sistema
 * @param caveId id de la cueva
 * @param systemId id del sistema
 *  @param commanderId: string id del usuario que realiza la acción
 * @param instanceName: string nombre de la instancia
 */

export async function removeCaveFromSystem(
  caveId: string,
  systemId: string,
  commanderId: string,
  instanceName: string
): Promise<Answer> {
  try {
    // Comprobar si el commander es editor de la instancia
    const isEditor = checkIsEditor(commanderId, instanceName)
    if (!isEditor) throw new Error('El usuario no es editor de la instancia')

    const conection = await connectToMongoDB()

    const cave = await Cave.findById(caveId)
    const system = await System.findById(systemId)

    if (!cave || !system) throw new Error('Cueva o sistema no encontrados')

    const session = await conection.startSession()
    session.startTransaction()

    // Eliminar la cueva del sistema
    const updatedSystem = system.removeCave(caveId, session)
    // Eliminar el sistema de la cueva
    const updatedCave = cave.setSystem('', session)
    if (!updatedSystem || !updatedCave)
      throw new Error('Error al eliminar la cueva del sistema')

    return {
      ok: true,
      message: 'Cueva eliminada del sistema',
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
