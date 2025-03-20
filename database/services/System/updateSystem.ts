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
    const validated = await SystemSchema.parseAsync(values)
    if (!validated || !commanderId || !values.instances[0])
      throw new Error('Datos no válidos')

    // TODO: Si en un futuro habrá más de una instancia por sistema, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, values.instances[0])
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
