'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import Instance, {
  InstanceDocument,
  PopulatedInstance,
} from '@/database/models/Instance.model'
import {Answer} from '@/database/types/answer.type'
import Group from '@/database/models/Group.model'
import User from '@/database/models/User.model'
import {
  InstanceFormSchema,
  InstanceFormValues,
} from '@/database/validation/instance.schemas'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import Platform, {PlatformDocument} from '../models/Platform.model'

/**
 * Función para obtener todas las instancias
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: PopulatedInstance[]
 * }
 */

export async function getAllInstances() {
  try {
    await connectToMongoDB()
    const allInstances = await Instance.find()
      .populate({path: 'coordinator', model: User})
      .populate({path: 'owner', model: Group})
      .populate({path: 'editors', model: User})
      .populate({path: 'viewers', model: User})
      .exec()
    const allInstancesPOJO = allInstances.map((instance) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(instance))
    })
    return {
      ok: true,
      code: 200,
      message: 'Instancias obtenidas',
      content: allInstancesPOJO as PopulatedInstance[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

export async function getSomeInstances(ids: string[]) {
  try {
    await connectToMongoDB()
    const someInstances = await Instance.find({
      _id: {$in: ids},
    })
      .populate({path: 'coordinator', model: User})
      .populate({path: 'owner', model: Group})
      .populate({path: 'editors', model: User})
      .populate({path: 'viewers', model: User})
      .exec()
    const someInstancesPOJO = someInstances.map((instance) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(instance))
    })
    return {
      ok: true,
      code: 200,
      message: 'Instancias obtenidas',
      content: someInstancesPOJO as PopulatedInstance[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * Función para obtener una instancia
 * @param name <string> nombre de la instancia
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: PopulatedInstance
 * }
 */

export async function getInstanceByName(name: string) {
  try {
    await connectToMongoDB()
    const instance: InstanceDocument = await Instance.findOne({
      name: name,
    })
      .populate({path: 'coordinator', model: User})
      .populate({path: 'owner', model: Group})
      .populate({path: 'editors', model: User})
      .populate({path: 'viewers', model: User})
      .exec()
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const instancePOJO = JSON.parse(JSON.stringify(instance))
    return {
      ok: true,
      code: 200,
      message: 'Instancia obtenida',
      content: instancePOJO as PopulatedInstance,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * Función para obtener una instancia por su id
 * @param id <string> id de la instancia
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: PopulatedInstance
 * }
 */
export async function getInstanceById(id: string) {
  try {
    await connectToMongoDB()
    const instance: InstanceDocument = await Instance.findOne({
      _id: id,
    })
      .populate({path: 'coordinator', model: User})
      .populate({path: 'owner', model: Group})
      .populate({path: 'editors', model: User})
      .populate({path: 'viewers', model: User})
      .exec()
    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const instancePOJO = JSON.parse(JSON.stringify(instance))
    return {
      ok: true,
      code: 200,
      message: 'Instancia obtenida',
      content: instancePOJO as PopulatedInstance,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * Función para crear una instancia
 * @param values datos del formulario
 * @returns <Answer> respuesta de la petición
 */

export async function createOneInstance(
  values: InstanceFormValues,
  commander: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await InstanceFormSchema.parseAsync(values)
    if (!validated) {
      return {ok: false, message: 'Datos no validos'} as Answer
    }

    // Validar staff
    //! REVISAR
    await connectToMongoDB()
    const subterra: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    const commanderIsStaff = subterra?.staff.toString().includes(commander)

    if (!commanderIsStaff) {
      return {ok: false, message: 'No estas autorizado para esto'} as Answer
    }

    // Crear nueva instancia con los valores:
    const newInstance = new Instance(values)

    // Iniciar transacción para garantizar la integridad de los datos
    //? https://mongoosejs.com/docs/transactions.html

    const conection = await connectToMongoDB()
    const session = await conection.startSession()
    session.startTransaction()

    // Insertar instancia en el usuario como coordinatorOf y editorOf:
    const updatedUser = await User.findOneAndUpdate(
      {_id: values.coordinator},
      {
        $push: {editorOf: newInstance._id, coordinatorOf: newInstance._id},
      },
      {session: session}
    )

    // Guardar la nueva instancia:
    const savedInstance = await newInstance.save({session: session})
    if (!savedInstance || !updatedUser) {
      session.endSession()
      return {ok: false, message: 'transacción fallida'} as Answer
    }

    await session.commitTransaction()
    session.endSession()

    return {
      ok: true,
      message: 'Instancia creada correctamente',
    } as Answer
  } catch (e) {
    return decodeMongoError(e)
  }
}
