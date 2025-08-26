'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import Cave from '@/database/models/Cave.model'

import {redirect, RedirectType} from 'next/navigation'

/**
 * @version 1
 * @description Elimina una cueva de la base de datos
 * @param caveId id de la cueva a eliminar
 * @param commanderId id del usuario que elimina la cueva
 */

export async function deleteCave(
  caveId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Comprobar si el commander es editor de la instancia
    await connectToMongoDB()
    const instances = (
      await Cave.findOne({_id: caveId}).select('instances').exec()
    )?.instances

    // TODO: Si en un futuro habrá más de una instancia por cueva, cambiar el método de comprobación
    const isEditor = await checkIsEditor(commanderId, null, instances[0])
    if (!isEditor) throw new Error('Usuario no es editor')

    // Eliminar la cueva:
    const deletedCave = await Cave.findByIdAndDelete(caveId)
    if (!deletedCave) throw new Error('Error al eliminar la cueva')
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al eliminar la cueva',
    } as Answer
  } finally {
    //* Redirigir a la lista de cavidades
    redirect('/list', RedirectType.push)
  }
}
