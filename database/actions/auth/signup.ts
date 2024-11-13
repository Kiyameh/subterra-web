'use server'

import bcrypt from 'bcryptjs'
import {connectToMongoDB} from '@/database/databaseConection'
import {SignUpSchema, SignUpValues} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/answer.type'
import UserModel from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

export default async function signUp(values: SignUpValues) {
  //1. Validación de datos
  const validationResult = SignUpSchema.safeParse(values)
  if (!validationResult.success) {
    return {code: 400, message: 'Datos inválidos'} as Answer
  }
  //? safeParse devuelve un objeto con la propiedad success que indica si la validación fue exitosa, y la propiedad data con los datos validados, o, en su defecto, la propiedad error con los errores

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
    console.log(newUser)
    connectToMongoDB()
    await newUser.save()
    return {
      code: 200,
      message: 'Usuario creado',
    } as Answer
  } catch (e) {
    console.log(e)
    return decodeMongoError(e)
  }
}
