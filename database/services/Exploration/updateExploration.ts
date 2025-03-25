'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {type Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Exploration from '@/database/models/Exploration.model'
import {type ExplorationFormValues} from '@/database/types/Exploration'
import {ExplorationSchema} from '@/database/types/Exploration'

/**
 * @version 3
 * @description Actualiza los datos de una exploración en la base de datos
 * @param values datos del formulario
 * @param updatedKeys claves de los valores que han cambiado en el formulario
 * @param explorationId id de la exploración a actualizar
 * @param commanderId id del usuario que actualiza la exploración
 */

export async function updateExploration(
  values: ExplorationFormValues,
  updatedKeys: Array<keyof ExplorationFormValues>,
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

    // Buscar la exploración:
    await connectToMongoDB()
    const currentExploration = await Exploration.findById(explorationId)
    if (!currentExploration) throw new Error('Documento no encontrado')

    // Crear el objeto "oldValues" con los valores actuales de los campos actualizados:

    const oldValues: Partial<ExplorationFormValues> = {}
    updatedKeys.forEach((key) => {
      oldValues[key] = currentExploration[key]
      oldValues['updatedAt'] = currentExploration.updatedAt
      oldValues['__v'] = currentExploration.__v
    })

    currentExploration.set(values)
    currentExploration.versions.push(oldValues)
    currentExploration.markModified('versions') //? Indicar a mongoose que se ha modificado (https://mongoosejs.com/docs/schematypes.html#mixed)
    currentExploration.updatedAt = new Date()

    // Guardar los cambios:
    const updatedExploration = await currentExploration.save()
    if (!updatedExploration) throw new Error('Error al guardar los cambios')

    return {
      ok: true,
      message: 'Exploración actualizada',
      _id: updatedExploration._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}
