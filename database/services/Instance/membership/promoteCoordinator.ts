'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import User from '@/database/models/User.model'

/**
 * @version 2
 * @description Función para promocionar un editor como coordinador
 * @param instanceId _id de la instancia
 * @param userId _id del usuario
 */

export async function promoteCoordinator(
  instanceId: string,
  userId: string | null
) {
  try {
    await connectToMongoDB()

    // TODO: Validar commander

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {coordinatorOf: instanceId},
      },
      {new: true}
    )

    if (!updatedUser) throw new Error('Error al promocionar coordinador')

    return {ok: true, message: 'Editor promocionado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
