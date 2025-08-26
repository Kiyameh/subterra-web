'use server'
import {connectToMongoDB} from '@/database/databaseConection'

import Instance from '@/database/models/Instance.model'

/**
 * @version 1
 * @description Función para obtener el id de una instancia por su nombre
 * @param instanceName  nombre de la instancia
 * @returns id de la instancia
 */

export async function getInstanceId(
  instanceName: string
): Promise<string | null> {
  try {
    await connectToMongoDB()
    const instance = await Instance.findOne({
      name: instanceName,
    })
      .select('_id')
      .exec()

    if (!instance) throw new Error('Instancia no encontrada')
    return instance._id.toString()
  } catch (error) {
    console.error(error)
    return null
  }
}
