'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Exploration from '@/database/models/Exploration.model'
import {
  ExplorationFormValues,
  ExplorationSchema,
} from '@/database/types/Exploration'

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
