'use server'
import {connectToMongoDB} from '@/database/databaseConection'

import User from '@/database/models/User.model'

import Group from '@/database/models/Group.model'

/**
 * @version 1
 * @description Función para comprobar si un usuario es admin de un grupo
 * @param userId _id del usuario
 * @param groupName nombre del grupo
 */
export async function checkIsAdmin(
  userId: string | undefined,
  groupName: string
): Promise<boolean> {
  try {
    await connectToMongoDB()

    const groupId = await Group.findOne({name: groupName}).select('_id').exec()

    const matchingAdmin = await User.findOne({
      _id: userId,
      adminOf: {$in: groupId},
    })
      .select('_id')
      .exec()

    if (!matchingAdmin) return false

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
