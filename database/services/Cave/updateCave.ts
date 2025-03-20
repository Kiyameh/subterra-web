'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Cave from '@/database/models/Cave.model'

import {CaveFormValues, CaveSchema} from '@/database/types/Cave'

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
    const validated = await CaveSchema.parseAsync(values)
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
