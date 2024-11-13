'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import InstanceModel from '@/database/models/Instance.model'
import {Answer} from '@/database/types/answer.type'

export default async function getAllInstances() {
  await connectToMongoDB()
  try {
    const allInstances = await InstanceModel.find()
      .populate('admin')
      .populate('owner')
      .exec()
    const allInstancesJSON = allInstances.map((instance) => {
      return instance.toJSON()
    })
    return {
      code: 200,
      message: 'Instancias obtenidas',
      content: allInstancesJSON,
    } as Answer
  } catch (error) {
    console.error(error)
    return {code: 500, message: 'Error desconocido'} as Answer
  }
}
