import React from 'react'

import {getSomeInstances} from '@/database/services/instance.services'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneGroup} from '@/database/services/group.services'
import {PopulatedGroup} from '@/database/models/Group.model'

import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import GroupInstancesTable, {
  GroupInstancesTableRow,
} from './group-instances-table'

export default async function GroupInstancesBoard({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener instancias
  const instances = (await getSomeInstances(group?.instances)).content as
    | PopulatedInstance[]
    | null

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
    coordinator: instance.coordinator.name,
  }))

  return <GroupInstancesTable rows={rows} />
}
