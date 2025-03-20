'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import Group from '@/database/models/Group.model'
import {GroupDocument} from '@/database/models/Group.model'

import {MemberRequestValues} from '@/components/Templates/groups/group-dialogs/membership-request-dialog'

//* 4. Funciones de peticiones de miembro */

/**
 * @version 1
 * @description Función para añadir una nueva petición de miembro
 * @param groupId _id del grupo
 * @param request objeto con user y message
 */

export async function addMemberRequest(
  groupId: string,
  request: MemberRequestValues
) {
  try {
    // Obtener grupo:
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findById(groupId)
    if (!group) {
      return {ok: false, message: 'Grupo no encontrado'} as Answer
    }

    // Comprobar si ya existe una solicitud:
    const existingRequest = group.member_requests.find(
      (groupRequest) => groupRequest.user.toString() === request.user
    )
    if (existingRequest) {
      return {ok: false, message: 'Ya existe una solicitud'} as Answer
    }

    // Insertar nueva solicitud:
    const updated = group.pushMemberRequest(request)
    if (!updated) throw new Error('Error al añadir la solicitud')

    return {
      ok: true,
      message: 'Solicitud de miembro añadida',
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
