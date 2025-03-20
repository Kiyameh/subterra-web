import React from 'react'
import {auth} from '@/auth'

import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'
import {SystemIndex} from '@/database/services/System/getSystemIndex'
import {getSystemIndex} from '@/database/services/System/getSystemIndex'

import NotFoundCard from '@/components/cards/404-not-found'
import AllSystemsTable from '@/components/_document-pages/system-list-board/all-systems-table'

/**
 * @version 1
 * @description Board con todos los sistemas
 * @param instanceName Nombre de la instancia
 */

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
