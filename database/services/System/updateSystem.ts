'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {type Answer} from '@/database/types/Answer'

import System from '@/database/models/System.model'
import {SystemSchema} from '@/database/types/System'
import {type SystemFormValues} from '@/database/types/System'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

/**
 * @version 3
 * @description Actualiza los datos de un sistema en la base de datos
 * @param values datos del formulario
 * @param updatedKeys claves de los valores que han cambiado en el formulario
 * @param caveId id del sistema a actualizar
 * @param commanderId id del usuario que actualiza el sistema
 */

export async function updateSystem(
  values: SystemFormValues,
  updatedKeys: Array<keyof SystemFormValues>,
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
    const currentSystem = await System.findById(systemId)
    if (!currentSystem) throw new Error('Documento no encontrado')

    // Crear el objeto "oldValues" con los valores actuales de los campos actualizados:
    const oldValues: Partial<SystemFormValues> = {}
    updatedKeys.forEach((key) => {
      oldValues[key] = currentSystem[key]
      oldValues['updatedAt'] = currentSystem.updatedAt
      oldValues['__v'] = currentSystem.__v
    })

    currentSystem.set(values)
    currentSystem.versions.push(oldValues)
    currentSystem.markModified('versions') //? Indicar a mongoose que se ha modificado (https://mongoosejs.com/docs/schematypes.html#mixed)
    currentSystem.updatedAt = new Date()

    // Guardar los cambios:
    const updatedSystem = await currentSystem.save()
    if (!updatedSystem) throw new Error('Error al guardar los cambios')

    return {
      ok: true,
      message: 'Sistema actualizado',
      _id: updatedSystem._id.toString(),
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}
