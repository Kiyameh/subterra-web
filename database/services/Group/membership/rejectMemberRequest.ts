'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Group from '@/database/models/Group.model'
import {type GroupDocument} from '@/database/models/Group.model'

/**
 * @version 2
 * @description Función para rechazar una solicitud de miembro
 * @param groupId _id del grupo
 * @param requestId _id de la solicitud
 */

export async function rejectMemberRequest(groupId: string, requestId: string) {
  try {
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findById(groupId)
    if (!group) throw new Error('Grupo no encontrado')

    const removed = await group.removeMemberRequest(requestId)
    if (!removed) throw new Error('Error al eliminar la solicitud')

    // TODO: Enviar email de feedback
    return {ok: true, message: 'Solicitud rechazada'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
