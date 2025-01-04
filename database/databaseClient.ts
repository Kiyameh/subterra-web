import {MongoClient, ServerApiVersion} from 'mongodb'

/**
 * Cliente de MongoDB plano para conexión de adaptador de Authjs
 * @returns {MongoClient} Cliente de MongoDB
 */

// 1. Variable para contener el cliente:
let databaseClient: MongoClient

// 2. Uri de conexión:
const {DB_USER, DB_PASSWORD} = process.env
if (!DB_USER || !DB_PASSWORD) throw new Error('ENV no definidas')
const conectionURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}Mgo$@subterradb.c0hrufd.mongodb.net/?retryWrites=true&w=majority`

// 3. Opciones de conexión
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

if (process.env.NODE_ENV === 'development') {
  // En modo de desarrollo, usar una variable global para que el valor se preserve a través de recargas de módulos causadas por HMR (Hot Module Replacement).
  const dbClientContainer = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
  if (!dbClientContainer._mongoClient) {
    dbClientContainer._mongoClient = new MongoClient(conectionURI, options)
  }
  databaseClient = dbClientContainer._mongoClient
} else {
  // En producción, simplemente crear un nuevo cliente en cada carga de módulo:
  databaseClient = new MongoClient(conectionURI, options)
}

export default databaseClient
