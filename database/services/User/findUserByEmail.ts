'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import User from '@/database/models/User.model'

/**
 * @version 1
 * @description Función para buscar un usuario por email
 * @param email string - Email del usuario
 */

export async function findUserByEmail(email: string | null | undefined) {
  try {
    await connectToMongoDB()
    const user = await User.findOne({email})
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
