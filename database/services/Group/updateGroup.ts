'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'
import {checkIsAdmin} from '@/database/services/Group/membership/checkIsAdmin'

import Group from '@/database/models/Group.model'

import {GroupFormValues} from '@/database/validation/group.schema'
import {GroupFormSchema} from '@/database/validation/group.schema'

/**
 * @version 1
 * @description Función para actualizar un grupo
 * @param values datos del formulario
 * @param groupId _id del grupo a editar
 * @param commanderId _id del usuario que edita el grupo
 */

export async function updateGroup(
  values: GroupFormValues,
  groupId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await GroupFormSchema.parseAsync(values)
    if (!validated) throw new Error('Datos no válidos')

    // Obtener grupo a editar:
    await connectToMongoDB()
    const groupToUpdate = await Group.findById(groupId)
    if (!groupToUpdate) throw new Error('Grupo no encontrado')

    // Comprobar si el ordenante es el admin del grupo:

    const commanderIsAdmin = checkIsAdmin(commanderId, groupToUpdate.name)
    if (!commanderIsAdmin) throw new Error('No es admin de este grupo')

    // Actualización de grupo:
    Object.assign(groupToUpdate, values)
    await groupToUpdate.save()
    return {
      ok: true,
      message: 'Grupo actualizado correctamente',
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
