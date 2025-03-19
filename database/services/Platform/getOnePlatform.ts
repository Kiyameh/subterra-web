'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'
import Platform from '@/database/models/Platform.model'

import {PlatformObject} from '@/database/models/Platform.model'

/**
 * @version 1
 * @description Función para obtener una plataforma
 * @param name Nombre de la plataforma (por defecto 'subterra')
 * @answer {ok, message, content: PlatformObject}
 */

export async function getOnePlatform(name: string = 'subterra') {
  try {
    // Obtener la plataforma:
    await connectToMongoDB()
    const platform = await Platform.findOne({name: name})
    if (!platform) throw new Error('No se ha encontrado la plataforma')

    // Convertir la plataforma a un objeto plano:
    const platformPOJO = JSON.parse(JSON.stringify(platform))

    // Devolver la plataforma:
    return {
      ok: true,
      message: 'Plataforma obtenida',
      content: platformPOJO as PlatformObject,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
