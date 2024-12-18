import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {
  MultiChipSlot,
  MultiDateSlot,
} from '@/components/_Atoms/slots/chip-slots'
import {TimeSlot} from '@/components/_Atoms/slots/number-slots'
import {IoMdInformationCircle} from 'react-icons/io'
import Divider from '@/components/_Atoms/boxes/divider'
import {CaveSlot} from '@/components/_Atoms/slots/documents-slots'
import {PopulatedExploration} from '@/database/services/exploration.actions'

export default function ExplorationInfoCard({
  exploration,
}: {
  exploration: PopulatedExploration
}) {
  return (
    <BasicCard
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
        value={exploration._id}
      />
      <TextSlot
        label="Nombre"
        value={exploration.name}
      />
      <MultiDateSlot
        label="Fechas de las exploraciones"
        values={exploration.dates}
      />
      <TimeSlot
        label="Tiempo en cavidad"
        valueInSeconds={exploration.cave_time}
      />
      <MultiChipSlot
        label="Participantes"
        values={exploration.participants}
      />
      <MultiChipSlot
        label="Colaboradores"
        values={exploration.collaborators}
      />
      <Divider text="Cavidades visitadas" />
      {exploration.caves &&
        exploration.caves.map((cave) => (
          <CaveSlot
            key={cave._id}
            cave={cave}
          />
        ))}
    </BasicCard>
  )
}
