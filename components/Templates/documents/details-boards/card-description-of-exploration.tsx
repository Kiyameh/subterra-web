import React from 'react'

import {type PlainExploration} from '@/database/services/Exploration/getPlainExploration'

import {TextSlot} from '@/components/Molecules/slots/text-slots'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'

import {BsCardText} from 'react-icons/bs'

/**
 * @version 3
 * @description Muestra las descripciones de una exploración
 * @param document documento de la cavidad
 */

export default function ExplorationDescriptionCard({
  document,
}: {
  document: PlainExploration
}) {
  return (
    <BasicCard
      className="w-full"
      key="description_card"
      cardHeader={
        <CardTitle
          title="Descipciones"
          icon={<BsCardText />}
        />
      }
    >
      <>
        <TextSlot
          label="Relato de exploración"
          value={document.description}
        />
        <TextSlot
          label="Incidentes ocurridos"
          value={document.incidents}
        />
        <TextSlot
          label="Inventario de material"
          value={document.inventory}
        />
        <TextSlot
          label="Trabajos pendientes"
          value={document.pending_work}
        />
      </>
    </BasicCard>
  )
}
