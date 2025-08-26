'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import User from '@/database/models/User.model'

/**
 * @version 2
 * @description Función para comprobar las credenciales de un usuario
 * @param email string - Email del usuario
 * @param password string - Contraseña del usuario
 */

export async function findUserByCredentials(email: string, password: string) {
  try {
    // 2. Buscar usuario en base de datos (MONGOOSE)
    await connectToMongoDB()

    const user = await User.findOne({email: email}).select(
      'password email image _id name'
    )

    if (!user) return null

    // 3. Comprobar credenciales
    const validPass = await user.comparePassword(password)

    // 4. Devolver respuesta sin password
    if (validPass)
      return {
        email: user.email,
        image: user.image,
        name: user.name,
        _id: user._id.toString(),
      }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
