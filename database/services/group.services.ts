'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/answer.type'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

import User from '@/database/models/User.model'
import {UserDocument} from '@/database/models/User.model'

import Group from '@/database/models/Group.model'
import {GroupDocument} from '@/database/models/Group.model'
import {PopulatedGroup} from '@/database/models/Group.model'
import {GroupIndex} from '@/database/models/Group.model'

import {GroupFormValues} from '@/database/validation/group.schema'
import {GroupFormSchema} from '@/database/validation/group.schema'
import {MemberRequestValues} from '@/components/boards/_interaction/membership-request-dialog'

//* 1. Funciones de escritura */

/**
 * @version 1
 * @description Función para crear un grupo
 * @param values datos del formulario
 * @param commanderId _id del usuario que crea el grupo
 * @returns  redirect: `/group/[groupName]`
 */
export async function createGroup(
  values: GroupFormValues,
  commanderId: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await GroupFormSchema.parseAsync(values)
    if (!validated || !commanderId) {
      return {ok: false, message: 'Datos no válidos'} as Answer
    }

    // Crear nuevo grupo con los valores de miembro y admin asignados:
    const newGroup = new Group({
      ...values,
      admin: commanderId,
      members: [commanderId],
    })

    // Iniciar transacción para garantizar la integridad de los datos
    //? https://mongoosejs.com/docs/transactions.html

    const conection = await connectToMongoDB()
    const session = await conection.startSession()
    session.startTransaction()

    // Insertar el grupo en el usuario como memberOf y adminOf
    const updatedUser = await User.findOneAndUpdate(
      {_id: commanderId},
      {
        $push: {memberOf: newGroup._id, adminOf: newGroup._id},
      },
      {session: session}
    )

    // Guardar el nuevo grupo:
    const savedGroup = await newGroup.save({session: session})

    if (!savedGroup || !updatedUser) {
      session.endSession()
      return {ok: false, message: 'Algo ha ido mal'} as Answer
    }

    await session.commitTransaction()
    session.endSession()

    return {
      ok: true,
      message: 'Grupo creado correctamente',
      redirect: `/group/${values.name}`,
    } as Answer
  } catch (e) {
    return decodeMongoError(e)
  }
}

/**
 * @version 1
 * @description Función para actualizar un grupo
 * @param values datos del formulario
 * @param groupId _id del grupo a editar
 * @param commanderId _id del usuario que edita el grupo
 */

export async function updateGroup(
  values: GroupFormValues,
  groupId: string,
  commanderId: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await GroupFormSchema.parseAsync(values)
    if (!validated) {
      return {
        ok: false,
        message: 'Datos no válidos',
      } as Answer
    }

    // Obtener grupo a editar:
    await connectToMongoDB()
    const groupToUpdate = await Group.findById(groupId)
    if (!groupToUpdate) {
      return {
        ok: false,
        message: 'Grupo no encontrado',
      } as Answer
    }

    // Comprobar si el ordenante es el admin del grupo:
    const commanderIsAdmin = groupToUpdate.admin.toString() === commanderId
    if (!commanderIsAdmin) {
      return {
        ok: false,
        message: 'No tienes permisos para editar este grupo',
      } as Answer
    }

    // Actualización de grupo:
    Object.assign(groupToUpdate, values)
    await groupToUpdate.save()
    return {
      ok: true,
      message: 'Grupo actualizado correctamente',
    } as Answer
  } catch (e) {
    return decodeMongoError(e)
  }
}

//* 2. Funciones de consulta */

/**
 * @version 1
 * @description Función para obtener el índice de todos los grupos
 * @returns content: Índice de grupos con los campos name, fullname, _id y province
 *
 */

export async function getGroupsIndex() {
  try {
    await connectToMongoDB()
    const groupsIndex = await Group.find()
      .select('_id name fullname province')
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const groupsIndexPOJO = groupsIndex.map((group) => {
      return JSON.parse(JSON.stringify(group))
    })

    return {
      ok: true,
      message: 'Índice de grupos obtenido',
      content: groupsIndexPOJO as GroupIndex[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para obtener el índice de un grupo
 * @param name nombre del grupo
 * @returns content: Índice de grupo con los campos name, fullname, _id y province
 */

export async function getOneGroupIndex(name: string) {
  try {
    await connectToMongoDB()
    const groupIndex = await Group.findOne({name: name})
      .select('_id name fullname province')
      .exec()

    if (!groupIndex) {
      return {
        ok: false,
        message: 'Grupo no encontrado',
      } as Answer
    }

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const groupIndexPOJO = JSON.parse(JSON.stringify(groupIndex))

    return {
      ok: true,
      message: 'Índice de grupo obtenido',
      content: groupIndexPOJO as GroupIndex,
    } as Answer
  } catch (e) {
    console.log(e)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 2
 * @description Función para obtener un grupo
 * @param name nombre del grupo
 * @returns content: Grupo con admin, members y member_requests populados
 */

export async function getOneGroup(name: string) {
  try {
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findOne({name: name})
      .populate({path: 'admin', model: User})
      .populate({path: 'members', model: User})
      .populate({path: 'member_requests.user', model: User})
      .exec()
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const groupPOJO = JSON.parse(JSON.stringify(group))
    return {
      ok: true,
      message: 'Grupo obtenido',
      content: groupPOJO as PopulatedGroup,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

//* 3. Funciones de membresía */

/**
 * @version 1
 * @description Función para comprobar si un usuario es miembro de un grupo
 * @param groupName nombre del grupo
 * @param userId _id del usuario
 */
export async function checkIsMember(
  groupName: string,
  userId: string | undefined | null
) {
  try {
    await connectToMongoDB()
    const matchingGroup: GroupDocument | null = await Group.findOne({
      name: groupName,
      members: {$in: [userId]},
    })
    if (!matchingGroup) {
      return {ok: false, message: 'No eres miembro'} as Answer
    }

    return {
      ok: true,
      message: 'Eres miembro',
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para comprobar si un usuario es admin de un grupo
 * @param groupName nombre del grupo
 * @param userId _id del usuario
 */
export async function checkIsAdmin(
  groupName: string,
  userId: string | undefined
) {
  try {
    await connectToMongoDB()
    const matchingGroup: GroupDocument | null = await Group.findOne({
      name: groupName,
      admin: userId,
    })
    if (!matchingGroup) {
      return {
        ok: false,
        message: 'No eres admin de este grupo',
      } as Answer
    }
    return {ok: true, message: 'Eres admin de este grupo'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

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

    // Obtener usuario:
    const userId: string = request.user._id.toString()
    const user: UserDocument | null = await User.findById(userId)
    if (!user) throw new Error('Usuario no encontrado')

    // Iniciar transacción:
    const session = await conection.startSession()
    session.startTransaction()

    // Actualizar datos
    const updatedUser = user.pushMemberOf(groupId, session)
    const updatedGroup = group.pushMember(userId, session)
    const removed = group.removeMemberRequest(requestId, session)

    // Terminar transacción
    if (!updatedUser || !updatedGroup || !removed) {
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

/**
 * @version 1
 * @description Función para eliminar un miembro de un grupo
 * @param groupId _id del grupo
 * @param userId _id del usuario
 */

export async function removeMember(groupId: string, userId: string | null) {
  try {
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findById(groupId)
    if (!group) throw new Error('Grupo no encontrado')

    const isMember = await checkIsMember(group.name, userId)
    if (!userId || !isMember) throw new Error('Usuario no es miembro')

    const updated = await group.removeMember(userId)
    if (!updated) throw new Error('Error al eliminar el miembro')

    return {ok: true, message: 'Miembro eliminado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para promocionar miembro como administrador
 * @param groupId _id del grupo
 * @param userId _id del usuario
 */

export async function promoteAdmin(groupId: string, userId: string | null) {
  try {
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findById(groupId)
    if (!group) throw new Error('Grupo no encontrado')

    const isMember = await checkIsMember(group.name, userId)
    if (!userId || !isMember) throw new Error('Usuario no es miembro')

    const updated = await group.setAdmin(userId)
    if (!updated) throw new Error('Error al promocionar miembro')

    return {ok: true, message: 'Miembro promocionado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
