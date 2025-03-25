'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import Cave from '@/database/models/Cave.model'
import {type Answer} from '@/database/types/Answer'

/**
 * @version 1
 * @description Obtiene todas las cavidades de un sistema
 * @param systemId id del sistema
 */
export async function getCavesOfSystem(systemId: string): Promise<Answer> {
  try {
    await connectToMongoDB()
    const caves = await Cave.find({system: systemId}).exec()
    if (!caves) throw new Error('Cavidades no encontradas')

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const cavesPOJO = JSON.parse(JSON.stringify(caves))

    return {
      ok: true,
      message: 'Cavidades obtenidas',
      content: cavesPOJO,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
