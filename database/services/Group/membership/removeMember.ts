'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import User from '@/database/models/User.model'

/**
 * @version 1
 * @description Función para eliminar un miembro de un grupo
 * @param groupId _id del grupo
 * @param userId _id del usuario
 */

export async function removeMember(groupId: string, userId: string | null) {
  try {
    await connectToMongoDB()

    // TODO: Validar commander

    const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $pull: {memberOf: groupId},
      }
    )

    if (!updatedUser) throw new Error('Error al eliminar miembro')

    return {ok: true, message: 'Miembro eliminado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
