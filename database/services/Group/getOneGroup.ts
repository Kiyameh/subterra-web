'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer'

import User, {UserIndex, UserObject} from '@/database/models/User.model'

import Group from '@/database/models/Group.model'
import {GroupDocument} from '@/database/models/Group.model'
import Instance from '@/database/models/Instance.model'
import {InstanceIndex} from '@/database/services/Instance/getInstancesIndex'

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
      .populate({path: 'member_requests.user', model: User})
      .exec()

    if (!group) throw new Error('Grupo no encontrado')

    const instances = await Instance.find({
      owner: group._id,
    })
      .select('_id name fullname territory is_online')
      .exec()

    const admins = await User.find({
      adminOf: {$in: [group._id]},
    })
      .select('_id name fullname image email')
      .exec()

    const members = await User.find({
      memberOf: {$in: [group._id]},
    })
      .select('_id name fullname image email')
      .exec()

    const populatedGroup = {
      ...group.toObject(),
      members,
      admins,
      instances,
    }
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const groupPOJO = JSON.parse(JSON.stringify(populatedGroup))

    return {
      ok: true,
      message: 'Grupo obtenido',
      content: groupPOJO as GroupWithUsers,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Retorno de la función getOneGroup
 */

export interface GroupObject extends Omit<GroupDocument, 'member_requests'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date

  member_requests: {_id: string; user: string; message: string}[]
}

export interface GroupWithUsers extends Omit<GroupObject, 'member_requests'> {
  member_requests: {_id: string; user: UserObject; message: string}[]
  instances: InstanceIndex[]
  admins: UserIndex[]
  members: UserIndex[]
}
