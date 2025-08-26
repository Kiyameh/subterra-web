'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type ResetPassValues} from '@/database/validation/auth.schemas'
import {ResetPassSchema} from '@/database/validation/auth.schemas'
import {type Answer} from '@/database/types/Answer'
import User from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

/**
 * @version 1
 * @description Función para actualizar la contraseña de un usuario
 * @param values ResetPassValues - Valores de actualización
 */

export async function updatePassword(values: ResetPassValues) {
  //1. Validación de datos
  const validationResult = ResetPassSchema.safeParse(values)
  if (!validationResult.success) {
    return {ok: false, code: 400, message: 'Datos inválidos'} as Answer
  }
  const {email, password} = validationResult.data

  //2. Actualizar contraseña
  try {
    await connectToMongoDB()
    const userToUpdate = await User.findOne({email}).select('password')
    userToUpdate.password = password
    await userToUpdate.save()

    return {ok: true, code: 200, message: 'Contraseña actualizada'} as Answer
  } catch (error) {
    console.error(error)
    return decodeMongoError(error)
  }
}
