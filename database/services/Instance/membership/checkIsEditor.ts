'use server'
import {connectToMongoDB} from '@/database/databaseConection'

import User from '@/database/models/User.model'

import Instance from '@/database/models/Instance.model'

/**
 * @version 1
 * @description Función para comprobar si un usuario es editor de una instancia
 * @param instanceName nombre de la instancia
 * @param userId _id del usuario
 */
export async function checkIsEditor(
  userId: string | undefined | null,
  instanceName?: string | null,
  instanceId?: string | null
): Promise<boolean> {
  try {
    await connectToMongoDB()

    if (!instanceId) {
      const instance = await Instance.findOne({name: instanceName})
        .select('_id')
        .exec()
      instanceId = instance?._id
    }

    const matchingEditor = await User.findOne({
      _id: userId,
      editorOf: {$in: instanceId},
    })

    if (!matchingEditor) return false
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
