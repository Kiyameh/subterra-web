'use server'
import {redirect, RedirectType} from 'next/navigation'

import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Exploration from '@/database/models/Exploration.model'

/**
 * @version 1
 * @description Elimina una exploración de la base de datos
 * @param explorationId id de la exploración a eliminar
 * @param commanderId id del usuario que elimina la cueva
 */

export async function deleteExploration(
  explorationId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Comprobar si el commander es editor de la instancia
    await connectToMongoDB()
    const instances = (
      await Exploration.findOne({_id: explorationId}).select('instances').exec()
    )?.instances

    // TODO: Si en un futuro habrá más de una instancia por exploración, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    const deletedExploration =
      await Exploration.findByIdAndDelete(explorationId)
    if (!deletedExploration) throw new Error('Exploración no encontrada')
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al eliminar la exploración',
    } as Answer
  } finally {
    //* Redirigir a la lista de exploraciones
    redirect('/list', RedirectType.push)
  }
}
