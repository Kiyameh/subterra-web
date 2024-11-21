'use server'

import {connectToMongoDB} from '@/database/databaseConection'
import {SignInSchema, SignInValues} from '@/database/validation/auth.schemas'
import UserModel, {User} from '@/database/models/User.model'
import bcrypt from 'bcryptjs'
/**
 * Función de autenticación de usuario
 * @param credentials {email,password} - Credenciales de usuario
 * @returns {data: User | null; error: string | null} - Usuario o error
 */
export async function checkCredentials(
  credentials: SignInValues
): Promise<{data: User | null; error: string | null}> {
  try {
    //1. Validación de datos
    const {email, password} = await SignInSchema.parseAsync(credentials)
    //? parseAsync genera un error si los datos no son válidos.

    // 2. Buscar usuario en base de datos:
    await connectToMongoDB()
    const user = await UserModel.findOne({
      email: email,
    }).select('+password')
    if (!user) throw new Error('Usuario no encontrado')

    //3. Comprobar credenciales:
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error('Credenciales invalidas')

    //4. Devolver usuario:
    return {data: user as User, error: null}
  } catch (e) {
    console.log(e)

    //5. Devolver error:
    return {data: null, error: (e as Error).message}
  }
}
