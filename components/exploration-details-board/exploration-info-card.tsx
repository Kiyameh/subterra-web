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

export default async function ExplorationInfoCard({
  explorationId,
}: {
  explorationId: string
}) {
  // Obtener la cavidad
  const exploration = (await getPlainExploration(explorationId))
    .content as PlainExploration | null

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
      {!exploration ? (
        <FetchingErrorButton />
      ) : (
        <>
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
        </>
      )}
    </BasicCard>
  )
}
