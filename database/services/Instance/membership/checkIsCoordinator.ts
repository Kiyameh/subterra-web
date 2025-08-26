'use server'
import {connectToMongoDB} from '@/database/databaseConection'

import User from '@/database/models/User.model'

import Instance from '@/database/models/Instance.model'

/**
 * @version 1
 * @description Función para comprobar si un usuario es coordinador de una instancia
 * @param instanceName nombre de la instancia
 * @param userId _id del usuario
 */

export async function checkIsCoordinator(
  userId: string | undefined | null,
  instanceName: string
): Promise<boolean> {
  try {
    await connectToMongoDB()

    const instanceId = await Instance.findOne({name: instanceName})
      .select('_id')
      .exec()

    const matchingCoordinator = await User.findOne({
      _id: userId,
      coordinatorOf: {$in: instanceId},
    })
      .select('_id')
      .exec()

    if (!matchingCoordinator) return false
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
