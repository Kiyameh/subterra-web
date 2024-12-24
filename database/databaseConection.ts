import mongoose, {Connection} from 'mongoose'

// Variable para cachear la conexión a MongoDB
let cachedConnection: Connection | null = null

export async function connectToMongoDB(): Promise<Connection> {
  const {DB_USER, DB_PASSWORD} = process.env

  // Verificar que las variables de entorno DB_USER y DB_PASSWORD existan
  if (!DB_USER || !DB_PASSWORD) {
    throw new Error('<Mongoose> DB_USER y DB_PASSWORD son requeridos')
  }
  // URI de conexión a MongoDB
  const conectionURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}Mgo$@subterradb.c0hrufd.mongodb.net/?retryWrites=true&w=majority`

  if (cachedConnection) {
    //console.error('<Mongoose> Usando conexión cacheada')
    return cachedConnection
  }

  try {
    // Nueva conexión a MongoDB
    const cnx = await mongoose.connect(conectionURI!, {dbName: `subterra`})
    // Cachear la conexión
    cachedConnection = cnx.connection
    // Mensaje de conexión exitosa
    //console.error('<Mongoose> DB conectada')
    return cachedConnection
  } catch (error) {
    console.error(error)
    throw error
  }
}
