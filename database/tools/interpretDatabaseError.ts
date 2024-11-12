import Answer from './Answer'

interface DatabaseError {
  code?: number
  name?: string
}

export default function interpretDatabaseError(error: unknown) {
  if ((error as DatabaseError).code === 11000) {
    return new Answer(409, 'Este nombre ya esta registrado', null)
  }
  if ((error as DatabaseError).name === 'ValidationError') {
    return new Answer(400, 'Datos incorrectos', null)
  }
  //TODO: Añadir interpretación de no autorizado (401)

  return new Answer(500, 'Error desconocido', null)
}
