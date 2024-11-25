'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import GroupModel from '@/database/models/Group.model'
import InstanceModel from '@/database/models/Instance.model'
import {Answer} from '@/database/types/answer.type'

export async function getAllInstances() {
  await connectToMongoDB()
  try {
    const allInstances = await InstanceModel.find()
      //.populate('admin') // TODO: Corregir
      //.populate('owner')
      .exec()
    const allInstancesJSON = allInstances.map((instance) => {
      return instance.toJSON()
    })
    return {
      ok: true,
      code: 200,
      message: 'Instancias obtenidas',
      content: allInstancesJSON,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

export async function getAllGroups() {
  await connectToMongoDB()
  try {
    const allGroups = await GroupModel.find()
      //.populate('admin') // TODO: Corregir
      //.populate('members')
      //.populate('editors')
      //.populate('publications')
      .exec()
    const allGroupsJSON = allGroups.map((group) => {
      return group.toJSON()
    })
    return {
      ok: true,
      code: 200,
      message: 'Grupos obtenidos',
      content: allGroupsJSON,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}
