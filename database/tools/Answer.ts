//* Clase empleada para encapsular las respuestas de las funciones de petición a la base de datos.
//* Creado para sustituir a la API Response en peticiones internas del servidor.
//* Funciona con los mismos códigos de estado

export default class Answer<T> {
  code: number
  message: string
  content: T | null

  constructor(code: number, message: string, content: T | null = null) {
    this.code = code
    this.message = message
    this.content = content
  }
}
