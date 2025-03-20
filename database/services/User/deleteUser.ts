'use server'
import {Answer} from '@/database/types/Answer'
import {connectToMongoDB} from '@/database/databaseConection'
import User from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

/**
 * @version 1
 * @description Función para eliminar un usuario
 * @param email
 */

export async function deleteUser(email: string | null | undefined) {
  try {
    await connectToMongoDB()
    await User.findOneAndDelete({email})
    return {ok: true, code: 200, message: 'Usuario eliminado'} as Answer
  } catch (error) {
    console.error(error)
    return decodeMongoError(error)
  }
}
