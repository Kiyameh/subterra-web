'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'

import User from '@/database/models/User.model'

/**
 * @version 2
 * @description Función para degradar un coordinador a editor
 * @param instanceId _id de la instancia
 * @param userId _id del usuario
 */

export async function demoteCoordinator(
  instanceId: string,
  userId: string | null
) {
  try {
    await connectToMongoDB()

    const isAnotherCoordinator = await User.find({
      coordinatorOf: {$in: [instanceId]},
    })
      .select('_id')
      .exec()

    if (isAnotherCoordinator.length < 2) {
      return {
        ok: false,
        message: 'No hay otro coordinador, elige a uno primero',
      } as Answer
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {coordinatorOf: instanceId},
      },
      {new: true}
    )

    if (!updatedUser) throw new Error('Error al degradar coordinador')

    return {ok: true, message: 'Coordinador degradado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
