'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import GroupModel from '@/database/models/Group.model'
import {Answer} from '@/database/types/answer.type'
import {
  GroupFormSchema,
  GroupFormValues,
} from '@/database/validation/group.schema'

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
      const newGroup = new GroupModel(requestedGroup)
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
