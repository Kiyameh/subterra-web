'use server'
import mongoose from 'mongoose'

import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/answer.type'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

import User from '@/database/models/User.model'
import Group from '@/database/models/Group.model'

import {GroupDocument} from '@/database/models/Group.model'
import {PopulatedGroup} from '@/database/models/Group.model'
import {GroupIndex} from '@/database/models/Group.model'
import {GroupFormValues} from '@/database/validation/group.schema'
import {GroupFormSchema} from '@/database/validation/group.schema'

/**
 * @version 1
 * @description Función para crear un grupo
 * @param values datos del formulario
 * @param commanderId _id del usuario que crea el grupo
 * @return  redirect: `/group/[groupName]`
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
        code: 400,
        message: 'Datos no válidos',
      } as Answer
    }

    // Obtener grupo a editar:
    await connectToMongoDB()
    const groupToUpdate = await Group.findById(groupId)
    if (!groupToUpdate) {
      return {
        ok: false,
        code: 404,
        message: 'Grupo no encontrado',
      } as Answer
    }

    // Comprobar si el ordenante es el admin del grupo:
    const commanderIsAdmin = groupToUpdate.admin.toString() === commanderId
    if (!commanderIsAdmin) {
      return {
        ok: false,
        code: 403,
        message: 'No tienes permisos para editar este grupo',
      } as Answer
    }

    // Actualización de grupo:
    Object.assign(groupToUpdate, values)
    await groupToUpdate.save()
    return {
      ok: true,
      code: 200,
      message: 'Grupo actualizado correctamente',
    } as Answer
  } catch (e) {
    return decodeMongoError(e)
  }
}

/**
 * @version 1
 * @description Función para obtener el índice de todos los grupos
 * @return content: Índice de grupos con los campos name, fullname, _id y province
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
      code: 200,
      message: 'Índice de grupos obtenido',
      content: groupsIndexPOJO as GroupIndex[],
    } as Answer
  } catch (e) {
    console.log(e)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para obtener el índice de un grupo
 * @param name nombre del grupo
 * @return content: Índice de grupo con los campos name, fullname, _id y province
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
        code: 404,
        message: 'Grupo no encontrado',
      } as Answer
    }

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const groupIndexPOJO = JSON.parse(JSON.stringify(groupIndex))

    return {
      ok: true,
      code: 200,
      message: 'Índice de grupo obtenido',
      content: groupIndexPOJO as GroupIndex,
    } as Answer
  } catch (e) {
    console.log(e)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 2
 * @description Función para obtener un grupo
 * @param name nombre del grupo
 * @return content: Grupo con admin, members y member_requests populados
 */

export async function getOneGroup(name: string) {
  try {
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findOne({name: name})
      .populate({path: 'admin', model: User})
      .populate({path: 'members', model: User})
      .populate({path: 'member_requests.user', model: User})
      .exec()
    const groupPOJO = JSON.parse(JSON.stringify(group))
    return {
      ok: true,
      code: 200,
      message: 'Grupo obtenido',
      content: groupPOJO as PopulatedGroup,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

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
      return {
        ok: false,
        code: 404,
        message: 'No eres miembro de este grupo',
      } as Answer
    }
    return {
      ok: true,
      code: 200,
      message: 'Eres miembro de este grupo',
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
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
        code: 404,
        message: 'No eres admin de este grupo',
      } as Answer
    }
    return {ok: true, code: 200, message: 'Eres admin de este grupo'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
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
  request: {user: string; message: string}
) {
  try {
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findById(groupId)
    if (!group) {
      return {ok: false, code: 404, message: 'Grupo no encontrado'} as Answer
    }

    const existingRequest = group.member_requests.find(
      (groupRequest) => groupRequest.user.toString() === request.user
    )

    if (existingRequest) {
      return {
        ok: false,
        code: 400,
        message: 'Ya existe una solicitud',
      } as Answer
    }
    group.member_requests.push({
      _id: new mongoose.Types.ObjectId(),
      message: request.message,
      user: new mongoose.Types.ObjectId(request.user),
    })
    const updatedGroup = await group.save()
    if (!updatedGroup) {
      return {ok: false, code: 404, message: 'Error desconocido'} as Answer
    }
    return {
      ok: true,
      code: 200,
      message: 'Solicitud de miembro añadida',
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para aceptar una solicitud de miembro
 * @param groupId _id del grupo
 * @param requestId _id de la solicitud
 */

export async function acceptMemberRequest(groupId: string, requestId: string) {
  try {
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findById(groupId)
      .populate({path: 'member_requests.user', model: User})
      .exec()

    if (!group) {
      return {ok: false, code: 404, message: 'Grupo no encontrado'} as Answer
    }

    const requestIndex = group.member_requests.findIndex(
      (request) => request._id.toString() === requestId
    )

    if (requestIndex === -1) {
      return {
        ok: false,
        code: 404,
        message: 'Solicitud no encontrada',
      } as Answer
    }

    // Transferir id aceptada al array de members

    group.members.push(group.member_requests[requestIndex].user._id)
    group.member_requests.splice(requestIndex, 1)
    await group.save()

    return {
      ok: true,
      code: 200,
      message: 'Solicitud aceptada y miembro añadido',
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para rechazar una solicitud de miembro
 * @param groupId _id del grupo
 * @param requestId _id de la solicitud
 */

export async function rejectMemberRequest(groupId: string, requestId: string) {
  try {
    await connectToMongoDB()
    const group: GroupDocument | null = await Group.findById(groupId)
    if (!group) {
      return {ok: false, code: 404, message: 'Grupo no encontrado'} as Answer
    }

    const requestIndex = group.member_requests.findIndex(
      (request) => request._id.toString() === requestId
    )

    if (requestIndex === -1) {
      return {
        ok: false,
        code: 404,
        message: 'Solicitud no encontrada',
      } as Answer
    }

    // Eliminar solicitud del array de member_requests
    group.member_requests.splice(requestIndex, 1)
    await group.save()

    return {ok: true, code: 200, message: 'Solicitud rechazada'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}
