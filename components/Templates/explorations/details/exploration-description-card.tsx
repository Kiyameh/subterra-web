import React from 'react'

import {getPlainExploration} from '@/database/services/Exploration/getPlainExploration'
import {PlainExploration} from '@/database/services/Exploration/getPlainExploration'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

import {BsCardText} from 'react-icons/bs'

/**
 * @version 1
 * @description Muestra la descripción de una exploración
 * @param explorationId Id de la exploración
 */
export default async function ExplorationDescriptionCard({
  explorationId,
}: {
  explorationId: string
}) {
  // Obtener la cavidad
  const exploration = (await getPlainExploration(explorationId))
    .content as PlainExploration | null

  return (
    <BasicCard
      key="exploration_description_card"
      cardHeader={
        <CardTitle
          title="Descripción de las exploraciones"
          icon={<BsCardText />}
        />
      }
    >
      {!exploration ? (
        <FetchingErrorButton />
      ) : (
        <>
          <TextSlot
            textArea
            label="Descripción general"
            value={exploration.description}
          />
          <TextSlot
            textArea
            label="Incidentes"
            value={exploration.incidents}
          />
          <TextSlot
            textArea
            label="Inventario de material"
            value={exploration.inventory}
          />
          <TextSlot
            textArea
            label="Trabajo pendiente"
            value={exploration.pending_work}
          />
        </>
      )}
    </BasicCard>
  )
}
