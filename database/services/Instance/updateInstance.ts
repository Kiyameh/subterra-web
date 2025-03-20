'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import Instance from '@/database/models/Instance.model'
import {UpdateInstanceFormValues} from '@/database/validation/instance.schemas'
import {UpdateInstanceFormSchema} from '@/database/validation/instance.schemas'
import {checkIsCoordinator} from '@/database/services/Instance/membership/checkIsCoordinator'

/**
 * @version 1
 * @description Función para actualizar una instancia
 * @param values datos de formulario
 * @param instanceId _id de la instancia
 * @param commanderId _id del usuario que edita
 */

export async function updateInstance(
  values: UpdateInstanceFormValues,
  instanceId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await UpdateInstanceFormSchema.parseAsync(values)
    if (!validated) {
      return {ok: false, message: 'Datos no validos'} as Answer
    }

    // Obtener instancia a editar:
    await connectToMongoDB()
    const instanceToUpdate = await Instance.findById(instanceId)
    if (!instanceToUpdate) throw new Error('Instancia no encontrada')

    // Comprobar si el usuario es coordinador de la instancia
    const commanderIsCoordinator = await checkIsCoordinator(
      commanderId,
      instanceToUpdate.name
    )
    if (!commanderIsCoordinator)
      throw new Error('No es coordinador de instancia')

    // Actualización de la instancia:
    Object.assign(instanceToUpdate, values)
    await instanceToUpdate.save()

    return {
      ok: true,
      message: 'Instancia actualizada',
      redirect: `/instance/${instanceToUpdate.name}`,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
