'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import System from '@/database/models/System.model'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import {redirect, RedirectType} from 'next/navigation'

/**
 * @version 1
 * @description Elimina un sistema de la base de datos
 * @param systemId id del sistema a eliminar
 * @param commanderId id del usuario que elimina la cueva
 */

export async function deleteSystem(
  systemId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Comprobar si el commander es editor de la instancia
    await connectToMongoDB()
    const instances = (
      await System.findOne({_id: systemId}).select('instances').exec()
    )?.instances

    // TODO: Si en un futuro habrá más de una instancia por sistema, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Eliminar el sistema:
    const deletedSystem = await System.findByIdAndDelete(systemId)
    if (!deletedSystem) throw new Error('Error al eliminar la cueva')
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al eliminar el sistema',
    } as Answer
  } finally {
    //* Redirigir a la lista de sistemas
    redirect('/list', RedirectType.push)
  }
}
