'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {type Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Cave from '@/database/models/Cave.model'

import {type CaveFormValues, CaveSchema} from '@/database/types/Cave'

/**
 * @version 3
 * @description Actualiza los datos de una cueva en la base de datos
 * @param values datos del formulario
 * @param updatedKeys claves de los valores que han cambiado en el formulario
 * @param caveId id de la cueva a actualizar
 * @param commanderId id del usuario que actualiza la cueva
 */

export async function updateCave(
  values: CaveFormValues,
  updatedKeys: Array<keyof CaveFormValues>,
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

    // Buscar la cueva:
    await connectToMongoDB()
    const currentCave = await Cave.findById(caveId)
    if (!currentCave) throw new Error('Documento no encontrado')

    // Crear el objeto "oldValues" con los valores actuales de los campos actualizados:
    const oldValues: Partial<CaveFormValues> = {}
    updatedKeys.forEach((key) => {
      oldValues[key] = currentCave[key]
      oldValues['updatedAt'] = currentCave.updatedAt
      oldValues['__v'] = currentCave.__v
    })

    currentCave.set(values)
    currentCave.versions.push(oldValues)
    currentCave.markModified('versions') //? Indicar a mongoose que se ha modificado (https://mongoosejs.com/docs/schematypes.html#mixed)
    currentCave.updatedAt = new Date()

    // Guardar los cambios:
    const updatedCave = await currentCave.save()
    if (!updatedCave) throw new Error('Error al guardar los cambios')

    return {
      ok: true,
      message: 'Cueva actualizada',
      _id: updatedCave._id.toString(),
    } as Answer
  } catch (error) {
    console.error(error)
    return decodeMongoError(error)
  }
}
