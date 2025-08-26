import React from 'react'

import {getOneGroup} from '@/database/services/Group/getOneGroup'
import {type GroupWithUsers} from '@/database/services/Group/getOneGroup'
import {getSomeInstances} from '@/database/services/Instance/getSomeInstances'
import {type InstanceWithUsers} from '@/database/services/Instance/getSomeInstances'

import GroupInstancesTable from './group-instances-table'
import {GroupInstancesTableRow} from './group-instances-table'

import NotFoundCard from '@/components/Organisms/containers/404-not-found'

/**
 * @version 1
 * @description Board de instancias de un grupo
 * @param groupName Nombre del grupo
 */

export default async function GroupInstancesBoard({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as GroupWithUsers | null

  // Obtener instancias
  const instances = (
    await getSomeInstances(group?.instances.map((instance) => instance._id))
  ).content as InstanceWithUsers[] | null

  // Validar roles de usuario
  if (!group || !instances) {
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
      />
    )
  }

  // Generar las filas de la tabla

  const rows: GroupInstancesTableRow[] = instances.map((instance) => ({
    _id: instance._id,
    name: instance.name,
    fullname: instance.fullname,
    territory: instance.territory,
    editors: instance.editors.map((editor) => editor.name),
    coordinators: instance.coordinators.map((coordinator) => coordinator.name),
  }))

  return <GroupInstancesTable rows={rows} />
}
