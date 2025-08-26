'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import User from '@/database/models/User.model'

/**
 * @version 2
 * @description Función para eliminasr un editor de una instancia
 * @param instanceId _id de la instancia
 * @param userId _id del usuario
 *
 */

export async function removeEditor(instanceId: string, userId: string | null) {
  try {
    await connectToMongoDB()

    // TODO: Validar commander

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {editorOf: instanceId},
      },
      {new: true}
    )

    if (!updatedUser) throw new Error('Error al eliminar editor')

    return {ok: true, message: 'Editor eliminado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
