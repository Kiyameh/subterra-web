'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/Answer.type'

import Group from '@/database/models/Group.model'

//* 2. Funciones de consulta */

/**
 * @version 1
 * @description Función para obtener el índice de todos los grupos
 * @returns content: Índice de grupos con los campos name, fullname, _id y province
 *
 */

export async function getGroupsIndex() {
  try {
    await connectToMongoDB()
    const groupsIndex = await Group.find()
      .select('_id name fullname province')
      .exec()

    //? Transforma a objeto plano para poder pasar a componentes cliente de Next
    const groupsIndexPOJO = groupsIndex.map((group) => {
      return JSON.parse(JSON.stringify(group))
    })

    return {
      ok: true,
      message: 'Índice de grupos obtenido',
      content: groupsIndexPOJO as GroupIndex[],
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
