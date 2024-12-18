import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'
import {TextSlot} from '../../_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {BsCardText} from 'react-icons/bs'
import {PopulatedExploration} from '@/database/services/exploration.actions'

export default function ExplorationDescriptionCard({
  exploration,
}: {
  exploration: PopulatedExploration
}) {
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
    </BasicCard>
  )
}
