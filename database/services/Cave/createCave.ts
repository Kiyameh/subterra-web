'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Cave from '@/database/models/Cave.model'

import {CaveFormValues, CaveSchema} from '@/database/types/Cave'

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
    const validated = await CaveSchema.parseAsync(values)
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
