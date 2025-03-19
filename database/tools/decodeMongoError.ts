import {MongoServerError} from 'mongodb'
import {MongooseError} from 'mongoose'
import {Answer} from '../types/Answer.type'

/** Función que interpreta un error de Mongo o Mongoose y devuelve un Answer apropiado para cliente
 * Incluye un console.error con el error original en el servidor
 * @param error Error de Mongo o Mongoose
 * @returns Answer con el mensaje de error
 */

export function decodeMongoError(error: unknown): Answer {
  let errorMessage = 'Error desconocido'
  if (error instanceof MongoServerError) {
    if (error.code === 11000) {
      const keyPattern = Object.keys(error.keyPattern)
      const campos = keyPattern.join(' y ')
      errorMessage = `El campo [${campos}] ya está registrado`
    }
  } else if (error instanceof MongooseError) {
    if (error.name === 'ValidationError') {
      errorMessage = 'Error del servidor'
    } else if (error.name === 'CastError') {
      errorMessage = 'Error del servidor'
    }
  }
  return {
    ok: false,
    message: errorMessage,
  } as Answer
}
