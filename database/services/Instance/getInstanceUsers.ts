'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import User from '@/database/models/User.model'

/**
 * @version 1
 * @description Función para obtener los usuarios de una instancia
 * @param instanceId
 */

export async function getInstanceUsers(instanceId: string) {
  try {
    await connectToMongoDB()
    const editors = await User.find({
      editorOf: {$in: [instanceId]},
    })
      .select('_id name fullname image email')
      .exec()

    const coordinators = await User.find({
      coordinatorOf: {$in: [instanceId]},
    })
      .select('_id name fullname image email')
      .exec()

    const viewers = await User.find({
      viewerOf: {$in: [instanceId]},
    })
      .select('_id name fullname image email')
      .exec()

    return {editors, coordinators, viewers}
  } catch (error) {
    console.error(error)
    return {editors: [], coordinators: [], viewers: []}
  }
}
