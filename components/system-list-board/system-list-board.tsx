import React from 'react'
import {auth} from '@/auth'
import {SystemIndex, getSystemIndex} from '@/database/services/system.actions'
import {checkIsEditor} from '@/database/services/instance.actions'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import AllSystemsTable from '@/components/system-list-board/all-systems-table'

export default async function SystemListBoard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener el indice de sistemas
  const systemIndex = (await getSystemIndex(instanceName)).content as
    | SystemIndex[]
    | undefined

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instanceName)

  if (!systemIndex)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Intentalo de nuevo más tarde"
      />
    )
  return (
    <AllSystemsTable
      systemIndex={systemIndex}
      instanceName={instanceName}
      isEditor={isEditor}
    />
  )
}
