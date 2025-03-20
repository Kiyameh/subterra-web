'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import User from '@/database/models/User.model'

/**
 * @version 3
 * @description Función para añadir un editor a una instancia
 * @param instanceId _id de la instancia
 * @param userEmail email del usuario
 */

export async function addEditor(instanceId: string, userEmail: string | null) {
  try {
    await connectToMongoDB()

    const user = await User.findOne({email: userEmail})
      .select('_id editorOf')
      .exec()

    if (!user) return {ok: false, message: 'Usuario no encontrado'} as Answer
    if (user.editorOf.includes(instanceId))
      return {ok: false, message: 'El usuario ya es editor'} as Answer

    await user.editorOf.push(instanceId)

    const updated = await user.save()

    if (!updated) throw new Error('Error al añadir editor')

    return {ok: true, message: 'Editor añadido'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
