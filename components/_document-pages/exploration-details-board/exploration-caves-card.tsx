import React from 'react'

import {getPopulatedExploration} from '@/database/services/Exploration/getPopulatedExploration'
import {PopulatedExploration} from '@/database/services/Exploration/getPopulatedExploration'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {CaveSlot} from '@/components/_Atoms/slots/documents-slots'

import {FaRegCircle} from 'react-icons/fa'
/**
 * @version 1
 * @description Muestra las cavidades de una exploración
 * @param explorationId Id de la exploración
 */

export default async function ExplorationCavesCard({
  explorationId,
}: {
  explorationId: string
}) {
  // Obtener el sistema
  const exploration = (await getPopulatedExploration(explorationId))
    .content as PopulatedExploration | null

  return (
    <BasicCard
      key="caves_card"
      cardHeader={
        <CardTitle
          title={'Cavidades visitadas'}
          icon={<FaRegCircle />}
        />
      }
    >
      {exploration?.caves.map((cave) => (
        <CaveSlot
          key={cave._id}
          cave={cave}
        />
      ))}
    </BasicCard>
  )
}
