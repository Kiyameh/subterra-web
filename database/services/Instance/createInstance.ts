'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'

import User from '@/database/models/User.model'
import Platform from '@/database/models/Platform.model'
import {PlatformDocument} from '@/database/models/Platform.model'

import Instance from '@/database/models/Instance.model'

import {InstanceFormValues} from '@/database/validation/instance.schemas'
import {InstanceFormSchema} from '@/database/validation/instance.schemas'

/**
 * @version 1
 * @description Función para crear una nueva instancia
 * @param values InstanceFormValues (Incluidos owner y coordinator)
 * @param commanderId string (Miembro del staff)
 */

export async function createInstance(
  values: InstanceFormValues,
  commanderId: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await InstanceFormSchema.parseAsync(values)
    if (!validated || !commanderId) throw new Error('Datos no validos')

    // Validar staff
    await connectToMongoDB()
    const subterra: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    const isStaff = subterra?.checkIsStaff(commanderId)
    if (!isStaff) throw new Error('No es staff de Subterra')

    // Iniciar transacción para garantizar la integridad de los datos
    //? https://mongoosejs.com/docs/transactions.html

    const conection = await connectToMongoDB()
    const session = await conection.startSession()
    session.startTransaction()

    const {coordinator, ...instanceValues} = values

    // Crear nueva instancia con los valores:
    const newInstance = new Instance(instanceValues)

    // Obtener el usuario coordinador e insertar instancia:
    const updatedUser = await User.findOneAndUpdate(
      {_id: coordinator},
      {$push: {editorOf: newInstance._id, coordinatorOf: newInstance._id}},
      {session: session}
    )

    // Guardar la nueva instancia:
    const savedInstance = await newInstance.save({session: session})

    if (!savedInstance || !updatedUser) {
      session.abortTransaction()
      session.endSession()
      throw new Error('Error al guardar la instancia')
    }

    await session.commitTransaction()
    session.endSession()

    return {
      ok: true,
      message: 'Instancia creada correctamente',
    } as Answer
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Algo ha ido mal, consulta el error',
    } as Answer
  }
}
