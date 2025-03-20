import React from 'react'

import {getPlainExploration} from '@/database/services/Exploration/getPlainExploration'
import {PlainExploration} from '@/database/services/Exploration/getPlainExploration'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import {TimeSlot} from '@/components/Molecules/slots/number-slots'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'
import {
  MultiChipSlot,
  MultiDateSlot,
} from '@/components/Molecules/slots/chip-slots'

import {IoMdInformationCircle} from 'react-icons/io'

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
