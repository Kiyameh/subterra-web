'use server'

import {connectToMongoDB} from '@/database/databaseConection'
import {SignInSchema, SignInValues} from '@/database/validation/auth.schemas'
import UserModel from '@/database/models/User.model'
import bcrypt from 'bcryptjs'

export async function checkCredentials(credentials: SignInValues) {
  try {
    //1. Validación de datos
    const {email, password} = await SignInSchema.parseAsync(credentials)
    //? parseAsync genera un error si los datos no son válidos.

    // 2. Buscar usuario en base de datos:
    await connectToMongoDB()
    const user = await UserModel.findOne({
      email: email,
    }).select('+password')
    if (!user) throw new Error('Wrong Email')

    //3. Comprobar credenciales:
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error('Wrong Password')

    //4. Devolver usuario:
    return user
  } catch (e) {
    console.log(e)
    return null
  }
}
