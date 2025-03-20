import React from 'react'

import {PlainSystem} from '@/database/services/System/getPlainSystem'
import {getPlainSystem} from '@/database/services/System/getPlainSystem'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

import {MdOutlineScience} from 'react-icons/md'

/**
 * @version 1
 * @description Muestra la información científica de un sistema
 * @param systemId Id del sistema
 */

export default async function SystemScienceCard({
  systemId,
}: {
  systemId: string
}) {
  // Obtener la cavidad
  const system = (await getPlainSystem(systemId)).content as PlainSystem | null

  return (
    <BasicCard
      key="science_card"
      cardHeader={
        <CardTitle
          title={'Información científica'}
          icon={<MdOutlineScience />}
        />
      }
    >
      {!system ? (
        <FetchingErrorButton />
      ) : (
        <>
          <TextSlot
            label="Era geológica"
            value={system.geolog_age}
          />
          <TextSlot
            label="Litología geológica"
            value={system.geolog_litology}
          />
          <TextSlot
            textArea
            label="Arqueología"
            value={system.arqueolog}
          />
          <TextSlot
            textArea
            label="Paleontología"
            value={system.paleontolog}
          />
          <TextSlot
            textArea
            label="Mineralogía"
            value={system.mineralog}
          />
          <TextSlot
            textArea
            label="Contaminación"
            value={system.contamination}
          />
          <TextSlot
            textArea
            label="Biología"
            value={system.biolog}
          />
          <TextSlot
            label="Sistema hidrológico"
            value={system.hidrolog_system}
          />
          <TextSlot
            label="Subsistema hidrológico"
            value={system.hidrolog_subsystem}
          />
        </>
      )}
    </BasicCard>
  )
}
