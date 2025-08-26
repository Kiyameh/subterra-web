'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {type Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Exploration from '@/database/models/Exploration.model'
import {ExplorationSchema} from '@/database/types/Exploration'
import {type ExplorationFormValues} from '@/database/types/Exploration'

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
