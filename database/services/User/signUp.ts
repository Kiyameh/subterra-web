'use server'
import User from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Answer} from '@/database/types/Answer.type'
import {SignUpSchema, SignUpValues} from '@/database/validation/auth.schemas'

/**
 * @version 1
 * @description Función para registrar un usuario
 * @param values SignUpValues - Valores de registro
 */
export async function signUp(values: SignUpValues) {
  //1. Validación de datos
  const validationResult = SignUpSchema.safeParse(values)

  //? safeParse evita generar errores. En su lugar devuelve un objeto con la propiedad success o error.

  if (!validationResult.success) {
    return {ok: false, code: 400, message: 'Datos inválidos'} as Answer
  }
  const {name, fullname, email, password} = validationResult.data

  //2. Actualizar datos de usuario
  try {
    const user = await User.findOne({email})
    user.name = name
    user.fullname = fullname
    user.password = password
    user.save()

    //3. Devolver respuesta
    return {
      ok: true,
      code: 200,
      message: `Datos actualizados correctamente`,
    } as Answer
  } catch (e) {
    console.error(e)
    return decodeMongoError(e)
  }
}
