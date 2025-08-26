'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'
import Platform from '@/database/models/Platform.model'

import type {PlatformDocument} from '@/database/models/Platform.model'

/**
 * @version 1
 * @description Función para eliminar un mensaje de contacto
 * @param messageId ID del mensaje a eliminar
 * @answer {ok, message}
 */

export async function deleteContactMessage(messageId: string) {
  try {
    // Buscar la plataforma subterra:
    await connectToMongoDB()
    const subterra: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    if (!subterra) throw new Error('No se ha encontrado la plataforma')

    // Eliminar el mensaje de la plataforma:

    const updated = subterra.removeContactMessage(messageId)
    if (!updated) throw new Error('No se ha podido eliminar el mensaje')

    // Devolver respuesta exitosa:
    return {ok: true, message: 'Mensaje eliminado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
