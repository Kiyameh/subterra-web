import React from 'react'
import {
  getPlainExploration,
  PlainExploration,
} from '@/database/services/exploration.actions'

import HeaderBox from '@/components/_Atoms/boxes/header-box'

import {IoCompassOutline} from 'react-icons/io5'

/**
 * @version 1
 * @description Caja de titulo para páginas de exploración
 * @param explorationId nombre de la exploración
 */

export default async function ExplorationHeader({
  explorationId,
}: {
  explorationId: string
}) {
  // Obtener la exploración
  const exploration = (await getPlainExploration(explorationId))
    .content as PlainExploration | null

  return (
    <HeaderBox
      text={exploration?.name || explorationId}
      icon={<IoCompassOutline />}
    />
  )
}
