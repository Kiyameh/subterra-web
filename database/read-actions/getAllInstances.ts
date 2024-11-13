'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import InstanceModel from '@/models/Instance.model'
import Answer from '../tools/Answer'
import interpretDatabaseError from '../tools/interpretDatabaseError'

export default async function getAllInstances() {
  await connectToMongoDB()

  // TODO: Add auxiliar functions

  try {
    const allInstances = await InstanceModel.find().exec()
    const allInstancesJSON = allInstances.map((instance) => {
      return instance.toJSON()
    })
    return new Answer(200, 'Instancias obtenidas', allInstancesJSON)
  } catch (error) {
    console.error(error)
    return interpretDatabaseError(error)
  }
}
