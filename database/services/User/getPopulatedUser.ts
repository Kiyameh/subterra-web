'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import Group from '@/database/models/Group.model'
import Instance from '@/database/models/Instance.model'
import User, {UserDocument} from '@/database/models/User.model'

/**
 * @version 1
 * @description Función para buscar un usuario por id
 * @param id
 */
export async function getPopulatedUser(id: string | null | undefined) {
  try {
    await connectToMongoDB()
    const user = await User.findById(id)
      .populate({path: 'memberOf', select: 'name fullname', model: Group})
      .populate({path: 'adminOf', select: 'name fullname', model: Group})
      .populate({path: 'editorOf', select: 'name fullname', model: Instance})
      .populate({
        path: 'coordinatorOf',
        select: 'name fullname',
        model: Instance,
      })
      .populate({path: 'viewerOf', select: 'name fullname', model: Instance})
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * @type Retorno de la función getFullUser
 */
export interface PopulatedUser
  extends Omit<
    UserDocument,
    'memberOf' | 'adminOf' | 'editorOf' | 'coordinatorOf' | 'viewerOf'
  > {
  memberOf: {id: string; name: string; fullname: string}[]
  adminOf: {id: string; name: string; fullname: string}[]
  editorOf: {id: string; name: string; fullname: string}[]
  coordinatorOf: {id: string; name: string; fullname: string}[]
  viewerOf: {id: string; name: string; fullname: string}[]
}
