'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'

import Group from '@/database/models/Group.model'

/**
 * @version 1
 * @description Función para obtener el índice de un grupo
 * @param name nombre del grupo
 * @returns content: Índice de grupo con los campos name, fullname, _id y province
 */

export async function getOneGroupIndex(name: string) {
  try {
    await connectToMongoDB()
    const groupIndex = await Group.findOne({name: name})
      .select('_id name fullname province')
      .exec()

    if (!groupIndex) {
      return {
        ok: false,
        message: 'Grupo no encontrado',
      } as Answer
    }

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const groupIndexPOJO = JSON.parse(JSON.stringify(groupIndex))

    return {
      ok: true,
      message: 'Índice de grupo obtenido',
      content: groupIndexPOJO as GroupIndex,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @type Retorno de la función getGroupsIndex y getOneGroupIndex
 */

export interface GroupIndex {
  _id: string
  name: string
  fullname: string
  province: string
}
