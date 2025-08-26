'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import User from '@/database/models/User.model'

/**
 * @version 1
 * @description Función para promocionar miembro como administrador
 * @param groupId _id del grupo
 * @param userId _id del usuario
 */

export async function promoteAdmin(groupId: string, userId: string | null) {
  try {
    await connectToMongoDB()

    const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $push: {adminOf: groupId},
      }
    )

    if (!updatedUser) throw new Error('Error al promocionar miembro')

    return {ok: true, message: 'Miembro promocionado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
