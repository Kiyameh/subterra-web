import mongoose, {Connection} from 'mongoose'

/**
 * Función para crear una conexión a MongoDB a través de Mongoose
 * @returns {Promise<Connection>} Conexión a MongoDB
 */

// 1. Variable para cachear la conexión a MongoDB
let cachedConnection: Connection | null = null

export async function connectToMongoDB(): Promise<Connection> {
  // 2. Uri de conexión:
  const {DB_USER, DB_PASSWORD} = process.env
  if (!DB_USER || !DB_PASSWORD) throw new Error('ENV no definidas')
  const conectionURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@subterradb.c0hrufd.mongodb.net/?retryWrites=true&w=majority`

  // 3. Opciones de conexión
  const options = {
    dbName: `subterra`,
  }

  // 4. Si ya hay una conexión, devolverla
  if (cachedConnection) {
    return cachedConnection
  }

  // 5. Intentar conectarse a MongoDB
  try {
    const cnx = await mongoose.connect(conectionURI!, options)
    cachedConnection = cnx.connection // Cachear la conexión
    return cachedConnection
  } catch (error) {
    console.error(error)
    throw error
  }
}
