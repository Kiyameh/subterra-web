'use server'
import {connectToMongoDB} from '@/database/databaseConection'

import User from '@/database/models/User.model'

import Group from '@/database/models/Group.model'

//* 3. Funciones de membresía */

/**
 * @version 1
 * @description Función para comprobar si un usuario es miembro de un grupo
 * @param userId _id del usuario
 * @param groupName nombre del grupo
 */
export async function checkIsMember(
  userId: string | undefined | null,
  groupName: string
): Promise<boolean> {
  try {
    await connectToMongoDB()

    const groupId = await Group.findOne({name: groupName}).select('_id').exec()

    const matchingMember = await User.findOne({
      _id: userId,
      memberOf: {$in: groupId},
    })
      .select('_id')
      .exec()

    if (!matchingMember) return false

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
