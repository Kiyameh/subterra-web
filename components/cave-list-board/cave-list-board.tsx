import React from 'react'
import {auth} from '@/auth'
import {CaveIndex, getCaveIndex} from '@/database/services/cave.actions'
import {checkIsEditor} from '@/database/services/instance.services'
import AllCavesTable from '@/components/cave-list-board/all-caves-table'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'

export default async function CaveListBoard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener el indice de cuevas
  const cavesIndex = (await getCaveIndex(instanceName)).content as
    | CaveIndex[]
    | undefined

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = (await checkIsEditor(userId, instanceName)).ok as boolean

  if (!cavesIndex)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Intentalo de nuevo más tarde"
      />
    )
  return (
    <AllCavesTable
      cavesIndex={cavesIndex}
      instanceName={instanceName}
      isEditor={isEditor}
    />
  )
}
