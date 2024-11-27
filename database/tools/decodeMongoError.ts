import {MongoError} from 'mongodb'
import {MongooseError} from 'mongoose'
import {Answer} from '../types/answer.type'

/** Función que interpreta un error de Mongo o Mongoose y devuelve un Answer apropiado
 * @param error Error de Mongo o Mongoose
 * @returns Answer con el código y mensaje de error
 */

export function decodeMongoError(error: unknown): Answer {
  let errorCode = 500
  let errorMessage = 'Error desconocido'
  if (error instanceof MongoError) {
    if (error.code === 11000) {
      errorCode = 409
      errorMessage = 'El registro ya existe'
    }
  } else if (error instanceof MongooseError) {
    if (error.name === 'ValidationError') {
      errorCode = 400
      errorMessage = 'Error de validación'
    } else if (error.name === 'CastError') {
      errorCode = 400
      errorMessage = 'Error de tipo de dato'
    }
  }
  return {
    ok: false,
    code: errorCode,
    message: errorMessage,
  } as Answer
}
