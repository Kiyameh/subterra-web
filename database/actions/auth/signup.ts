'use server'

import {SignUpSchema, SignUpValues} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/answer.type'

export default async function signUp(values: SignUpValues) {
  //1. Validación de datos
  const validateFields = SignUpSchema.safeParse(values)

  if (!validateFields.success) {
    const answer: Answer = {code: 400, message: 'Datos inválidos'}
    return answer
  }

  //2. Añadir a la base de datos
  // TODO
  const addedUser = {name: 'hola', email: 'asd'}
  if (!addedUser) {
    const answer: Answer = {code: 401, message: 'Error de base de datos'} // TODO: Interpretar el error
    return answer
  }

  //3. Respuesta
  const answer: Answer = {
    code: 200,
    message: 'Usuario creado',
    content: addedUser,
  }
  return answer
}
