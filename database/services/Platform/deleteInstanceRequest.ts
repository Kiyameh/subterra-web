'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'
import Platform from '@/database/models/Platform.model'

import {PlatformDocument} from '@/database/models/Platform.model'

/**
 * @version 1
 * @description Función para eliminar una solicitud de creación de instancia
 * @param requestId ID de la solicitud a eliminar
 * @answer {ok, message}
 */

export async function deleteInstanceRequest(requestId: string) {
  try {
    // Buscar la plataforma subterra:
    await connectToMongoDB()
    const subterra: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    if (!subterra) throw new Error('No se ha encontrado la plataforma')

    // Eliminar la solicitud de la plataforma:
    const updated = subterra.removeInstanceRequest(requestId)
    if (!updated) throw new Error('No se ha podido eliminar la solicitud')

    // Devolver respuesta exitosa:
    return {ok: true, message: 'Solicitud eliminada'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
