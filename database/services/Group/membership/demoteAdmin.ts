'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import User from '@/database/models/User.model'

/**
 * @version 1
 * @description Función para degradar administrador a miembro
 * @param groupId _id del grupo
 * @param userId _id del usuario
 */

export async function demoteAdmin(groupId: string, userId: string | null) {
  try {
    await connectToMongoDB()

    const isAnotherAdmin = await User.find({
      adminOf: {$in: [groupId]},
    })
      .select('_id')
      .exec()

    if (isAnotherAdmin.length < 2)
      return {
        ok: false,
        message: 'No hay otro administrador, elige a uno primero',
      } as Answer

    const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $pull: {adminOf: groupId},
      }
    )

    if (!updatedUser) throw new Error('Error al degradar admin')

    return {ok: true, message: 'Admin degradado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
