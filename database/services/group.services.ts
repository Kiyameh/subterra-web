'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import Group, {PopulatedGroup} from '@/database/models/Group.model'
import {Answer} from '@/database/types/answer.type'
import {
  GroupFormSchema,
  GroupFormValues,
} from '@/database/validation/group.schema'

/**
 * Función para crear un grupo
 * @param values <GroupFormValues> datos del formulario
 * @param editor _id del creador del grupo
 * @returns <Answer> respuesta de la petición
 * Redirect: /group/:name
 */
export async function createOneGroup(
  values: GroupFormValues,
  editor: string
): Promise<Answer> {
  try {
    // Validación:
    const validated = await GroupFormSchema.parseAsync(values)

    // Creación de grupo:
    if (validated && editor) {
      await connectToMongoDB()
      // Insertar el creador como admin
      const requestedGroup = {...values, admin: editor}
      const newGroup = new Group(requestedGroup)
      await newGroup.save()
    }

    return {
      ok: true,
      code: 200,
      message: 'Group creado correctamente',
      redirect: `/group/${values.name}`,
    } as Answer
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      code: 500,
      message: 'Error al crear el grupo',
    } as Answer
  }
}

/**
 * Función para obtener todos los grupos
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: PopulatedGroup[]
 * } */

export async function getAllGroups() {
  try {
    await connectToMongoDB()
    const allGroups = await Group.find()
      .populate({path: 'admin', model: 'User'})
      .populate({path: 'members', model: 'User'})
      .populate({path: 'instances', model: 'Instance'})
      //.populate({path: 'explorations', model: 'Exploration'})//TODO: Añadir cuando este el tipo hecho
      .exec()
    const allGroupsPOJO = allGroups.map((group) => {
      //? Transforma a objeto plano para poder pasar a componentes cliente de Next
      return JSON.parse(JSON.stringify(group))
    })
    return {
      ok: true,
      code: 200,
      message: 'Grupos obtenidos',
      content: allGroupsPOJO as PopulatedGroup[],
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}

/**
 * Función para obtener un grupo
 * @param name <string> nombre del grupo
 * @returns <Answer> respuesta de la petición
 * Content: POJO del grupo
 */

export async function getOneGroup(name: string) {
  try {
    await connectToMongoDB()
    const group = await Group.findOne({name: name})
      .populate({path: 'admin', model: 'User'})
      .populate({path: 'members', model: 'User'})
      .populate({path: 'instances', model: 'Instance'})
    //.populate({path: 'explorations', model: 'Exploration'})//TODO: Añadir cuando este el tipo hecho
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
