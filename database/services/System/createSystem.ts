'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Answer} from '@/database/types/Answer'

import System from '@/database/models/System.model'
import {SystemSchema} from '@/database/types/System'
import {SystemFormValues} from '@/database/types/System'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

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
    const validated = await SystemSchema.parseAsync(values)
    if (!validated || !commanderId || !values.instances[0])
      throw new Error('Datos no válidos')

    // TODO: Si en un futuro habrá más de una instancia por sistema, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, values.instances[0])
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
