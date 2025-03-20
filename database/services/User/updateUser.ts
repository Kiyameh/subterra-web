'use server'
import {
  ProfileEditSchema,
  ProfileEditValues,
} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/Answer'
import {connectToMongoDB} from '@/database/databaseConection'
import User from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

/**
 * @version 1
 * @description Función para actualizar un usuario
 * @param values SignUpValues - Valores de actualización
 */

export async function updateUser(values: ProfileEditValues) {
  //1. Validación de datos
  const validationResult = ProfileEditSchema.safeParse(values)
  if (!validationResult.success) {
    return {ok: false, code: 400, message: 'Datos inválidos'} as Answer
  }
  const {email, name, fullname} = validationResult.data

  //2. Actualizar usuario
  try {
    await connectToMongoDB()
    await User.findOneAndUpdate({email}, {name, fullname})
    return {ok: true, code: 200, message: 'Usuario actualizado'} as Answer
  } catch (error) {
    console.error(error)
    return decodeMongoError(error)
  }
}
