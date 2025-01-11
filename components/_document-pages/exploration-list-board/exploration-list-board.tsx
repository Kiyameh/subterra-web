import React from 'react'
import {auth} from '@/auth'
import {
  ExplorationIndex,
  getExplorationsIndex,
} from '@/database/services/exploration.actions'
import {checkIsEditor} from '@/database/services/instance.actions'
import NotFoundCard from '@/components/cards/404-not-found'
import AllExplorationsTable from '@/components/_document-pages/exploration-list-board/all-explorations-table'

/**
 * @version 1
 * @description Board con la lista de exploraciones
 * @param instanceName Nombre de la instancia
 */
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
  const isEditor = await checkIsEditor(userId, instanceName)

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
