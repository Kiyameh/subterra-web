import React from 'react'
import {auth} from '@/auth'

import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import InstanceEditorsTable, {
  InstanceEditorsTableRow,
} from '@/components/instance-editors-board/instance-editors-table'
import {
  checkIsCoordinator,
  getOneInstance,
  InstanceWithUsers,
} from '@/database/services/instance.actions'

/**
 * @version 1
 * @description Board de editores de una instancia
 * @param instanceName Nombre de la instancia
 */

export default async function InstasnceEditorsBoard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as InstanceWithUsers | null
  console.log(instance)

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isCoordinator = await checkIsCoordinator(userId, instanceName)

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
    isCoordinator: instance.coordinators
      .map((c) => c._id.toString())
      .includes(editor._id),
  }))

  return (
    <InstanceEditorsTable
      instanceId={instance._id}
      rows={rows}
      adminActions={isCoordinator}
    />
  )
}
