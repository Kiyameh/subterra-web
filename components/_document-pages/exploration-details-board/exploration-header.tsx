import React from 'react'
import {
  getPlainExploration,
  PlainExploration,
} from '@/database/services/exploration.actions'

import HeaderBox from '@/components/_Atoms/boxes/header-box'

import {IoCompassOutline} from 'react-icons/io5'
import {auth} from '@/auth'
import {checkIsEditor} from '@/database/services/instance.actions'
import MainPictureCard from '../_shared-cards/main-picture-card'
import ExplorationToolBar from '../_toolbars/exploration-toolbar'

/**
 * @version 2
 * @description Caja de titulo para páginas de exploración
 * @param explorationId nombre de la exploración
 * @param instanceName nombre de la instancia
 */

export default async function ExplorationHeader({
  explorationId,
  instanceName,
}: {
  explorationId: string
  instanceName: string
}) {
  // Obtener la exploración
  const exploration = (await getPlainExploration(explorationId))
    .content as PlainExploration | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instanceName)

  return (
    <div className="w-full">
      {exploration?.pictures?.[0] && (
        <MainPictureCard
          src={exploration?.pictures?.[0].file_src ?? null}
          alt={exploration?.pictures?.[0].description}
        />
      )}

      <HeaderBox
        text={exploration?.name || explorationId}
        icon={<IoCompassOutline />}
      />
      <ExplorationToolBar
        isEditor={isEditor}
        commanderId={userId}
      />
    </div>
  )
}
