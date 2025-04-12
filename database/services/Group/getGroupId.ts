'use server'

import {connectToMongoDB} from '@/database/databaseConection'

import Group from '@/database/models/Group.model'

/**
 * @version 1
 * @description Obtiene el id de un grupo por su nombre
 * @param groupName - Nombre del grupo
 * @returns id del grupo
 */

export async function getGroupId(groupName: string): Promise<string | null> {
  try {
    await connectToMongoDB()
    const group = await Group.findOne({name: groupName}).select('_id').exec()

    if (!group) throw new Error('Grupo no encontrado')
    return group._id.toString()
  } catch (error) {
    console.error(error)
    return null
  }
}
