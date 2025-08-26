import React from 'react'

import {type PlainExploration} from '@/database/services/Exploration/getPlainExploration'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import {MultiDateSlot} from '@/components/Molecules/slots/chip-slots'
import {MultiChipSlot} from '@/components/Molecules/slots/chip-slots'
import {TimeSlot} from '@/components/Molecules/slots/number-slots'

import {IoMdInformationCircle} from 'react-icons/io'

/**
 * @version 1
 * @description Muestra la información general de una exploración
 * @param document documento
 */

export default function ExplorationInfoCard({
  document,
}: {
  document: PlainExploration
}) {
  return (
    <BasicCard
      className="w-full"
      key="exploration_info_card"
      cardHeader={
        <CardTitle
          title={'Información general'}
          icon={<IoMdInformationCircle />}
        />
      }
    >
      <TextSlot
        label="ID"
        value={document._id}
      />
      <TextSlot
        label="Nombre"
        value={document.name}
      />
      <MultiDateSlot
        label="Fechas de las exploraciones"
        values={document.dates}
      />
      <TimeSlot
        label="Tiempo en cavidad"
        valueInSeconds={document.cave_time}
      />
      <MultiChipSlot
        label="Participantes"
        values={document.participants}
      />
      <MultiChipSlot
        label="Colaboradores"
        values={document.collaborators}
      />
    </BasicCard>
  )
}
