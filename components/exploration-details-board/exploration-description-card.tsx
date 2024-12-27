import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'
import {TextSlot} from '../_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {BsCardText} from 'react-icons/bs'
import {
  getPlainExploration,
  PlainExploration,
} from '@/database/services/exploration.actions'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

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
