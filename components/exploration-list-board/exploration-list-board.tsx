import React from 'react'
import {auth} from '@/auth'
import {
  ExplorationIndex,
  getExplorationsIndex,
} from '@/database/services/exploration.actions'
import {checkIsEditor} from '@/database/services/instance.services'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import AllExplorationsTable from '@/components/exploration-list-board/all-explorations-table'

export default async function ExplorationListBoard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener el indice de sistemas
  const explorationIndex = (await getExplorationsIndex(instanceName))
    .content as ExplorationIndex[] | undefined

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = (await checkIsEditor(userId, instanceName)).ok as boolean

  if (!explorationIndex)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Intentalo de nuevo más tarde"
      />
    )
  return (
    <AllExplorationsTable
      explorationsIndex={explorationIndex}
      instanceName={instanceName}
      isEditor={isEditor}
    />
  )
}
