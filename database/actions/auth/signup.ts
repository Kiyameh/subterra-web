'use server'

import {connectToMongoDB} from '@/database/databaseConection'
import {SignUpSchema, SignUpValues} from '@/database/validation/auth.schemas'
import UserModel from '@/database/models/User.model'
import bcrypt from 'bcryptjs'
import {Answer} from '@/database/types/answer.type'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

export default async function signUp(values: SignUpValues) {
  //1. Validación de datos
  const validationResult = SignUpSchema.safeParse(values)

  //? safeParse evita generar errores. En su lugar devuelve un objeto con la propiedad success o error.

  if (!validationResult.success) {
    return {ok: false, code: 400, message: 'Datos inválidos'} as Answer
  }

  //2. Añadir a la base de datos
  const {name, fullname, email, password} = validationResult.data
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({
      name,
      fullname,
      email,
      password: hashedPassword,
    })
    connectToMongoDB()
    await newUser.save()

    //3. Devolver respuesta
    return {
      ok: true,
      code: 200,
      message: 'Usuario creado',
    } as Answer
  } catch (e) {
    return decodeMongoError(e)
  }
}
