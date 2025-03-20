'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

import User from '@/database/models/User.model'

import Group from '@/database/models/Group.model'

import {GroupFormValues} from '@/database/validation/group.schema'
import {GroupFormSchema} from '@/database/validation/group.schema'

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
    if (!validated || !commanderId) throw new Error('Datos no válidos')

    // Iniciar transacción para garantizar la integridad de los datos
    //? https://mongoosejs.com/docs/transactions.html

    const conection = await connectToMongoDB()
    const session = await conection.startSession()
    session.startTransaction()

    // Crear nuevo grupo con los valores:
    const newGroup = new Group(values)

    // Insertar el grupo en el usuario como memberOf y adminOf
    const updatedUser = await User.findOneAndUpdate(
      {_id: commanderId},
      {$push: {memberOf: newGroup._id, adminOf: newGroup._id}},
      {session: session}
    )

    // Guardar el nuevo grupo:
    const savedGroup = await newGroup.save({session: session})

    if (!savedGroup || !updatedUser) {
      session.endSession()
      throw new Error('Error al guardar el grupo')
    }

    await session.commitTransaction()
    session.endSession()

    return {
      ok: true,
      message: 'Grupo creado correctamente',
      redirect: `/group/${values.name}`,
    } as Answer
  } catch (error) {
    return decodeMongoError(error)
  }
}
