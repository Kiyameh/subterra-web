'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import User from '@/database/models/User.model'

import Group from '@/database/models/Group.model'
import {type GroupDocument} from '@/database/models/Group.model'

/**
 * @version 2
 * @description Función para aceptar una solicitud de miembro
 * @param groupId _id del grupo
 * @param requestId _id de la solicitud
 */

export async function acceptMemberRequest(groupId: string, requestId: string) {
  try {
    const conection = await connectToMongoDB()

    // Obtener grupo:
    const group: GroupDocument | null = await Group.findById(groupId)
      .populate({path: 'member_requests.user', model: User})
      .exec()
    if (!group) throw new Error('Grupo no encontrado')

    // Obtener petición:
    const request = group.member_requests.find(
      (request) => request._id.toString() === requestId
    )
    if (!request) throw new Error('Solicitud no encontrada')

    // Obtener id usuario:
    const userId: string = request.user._id.toString()

    // Iniciar transacción:
    const session = await conection.startSession()
    session.startTransaction()

    // Actualizar datos
    const newMember = await User.findOneAndUpdate(
      {_id: userId},
      {
        $push: {memberOf: group._id},
      },
      {session: session}
    )

    const removedRequest = group.removeMemberRequest(requestId, session)

    // Terminar transacción
    if (!newMember || !removedRequest) {
      session.abortTransaction()
      session.endSession()
      throw new Error('Error al actualizar los datos')
    }

    await session.commitTransaction()
    session.endSession()

    // TODO: Enviar email de feedback
    return {ok: true, message: 'Solicitud aceptada'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
