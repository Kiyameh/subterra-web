'use server'

import {SignInSchema, SignInValues} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/answer.type'

export default async function signIn(values: SignInValues) {
  //1. Validación de datos
  const validateFields = SignInSchema.safeParse(values)

  if (!validateFields.success) {
    const answer: Answer = {code: 400, message: 'Datos inválidos'}
    return answer
  }

  //2. Autenticación
  // TODO
  const authorizedUser = {name: 'hola', email: 'asd'}
  if (!authorizedUser) {
    const answer: Answer = {code: 401, message: 'Credenciales inválidas'}
    return answer
  }

  //3. Respuesta
  const answer: Answer = {
    code: 200,
    message: 'Usuario autenticado',
    content: authorizedUser,
  }
  return answer
}
