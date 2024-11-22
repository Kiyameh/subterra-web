'use server'
import {Answer} from '@/database/types/answer.type'
import {GroupFormValues} from '@/database/validation/group.schema'

export async function createOneGroup(
  values: GroupFormValues,
  editor: string
): Promise<Answer> {
  //TODO: Lógica de database
  console.log(values)
  console.log(editor)
  return {
    ok: true,
    code: 200,
    message: 'Group creado correctamente',
    redirect: `/group/${values.name}`,
  }
}
