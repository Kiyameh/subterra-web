import React from 'react'
import {auth} from '@/auth'
import {
  checkIsCoordinator,
  getOneInstance,
} from '@/database/services/instance.services'

import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import {PopulatedInstance} from '@/database/models/Instance.model'
import InstanceEditorsTable, {
  InstanceEditorsTableRow,
} from '@/components/instance-editors-board/instance-editors-table'

export default async function InstasnceEditorsBoard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as PopulatedInstance | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isCoordinator = (await checkIsCoordinator(instanceName, userId))
    .ok as boolean

  if (!instance) {
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
      />
    )
  }

  // Generar las filas de la tabla
  const rows: InstanceEditorsTableRow[] = instance.editors.map((editor) => ({
    _id: editor._id,
    name: editor.name,
    image: editor.image,
    fullname: editor.fullname,
    email: editor.email,
    isCoordinator: instance.coordinator._id.toString() === editor._id,
  }))

  return (
    <InstanceEditorsTable
      instanceId={instance._id}
      rows={rows}
      adminActions={isCoordinator}
    />
  )
}
