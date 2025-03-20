import React from 'react'

import {getPlainCave, PlainCave} from '@/database/services/Cave/getPlainCave'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

import {MdOutlineScience} from 'react-icons/md'

/**
 * @version 1
 * @description Muestra la información científica de una cavidad
 * @param caveId Id de la cavidad
 */

export default async function CaveScienceCard({caveId}: {caveId: string}) {
  // Obtener la cavidad
  const cave = (await getPlainCave(caveId)).content as PlainCave | null

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
      {!cave ? (
        <FetchingErrorButton />
      ) : (
        <>
          <TextSlot
            label="Era geológica"
            value={cave.geolog_age}
          />
          <TextSlot
            label="Litología geológica"
            value={cave.geolog_litology}
          />
          <TextSlot
            textArea
            label="Arqueología"
            value={cave.arqueolog}
          />
          <TextSlot
            textArea
            label="Paleontología"
            value={cave.paleontolog}
          />
          <TextSlot
            textArea
            label="Mineralogía"
            value={cave.mineralog}
          />
          <TextSlot
            textArea
            label="Contaminación"
            value={cave.contamination}
          />
          <TextSlot
            textArea
            label="Biología"
            value={cave.biolog}
          />
          <TextSlot
            label="Sistema hidrológico"
            value={cave.hidrolog_system}
          />
          <TextSlot
            label="Subsistema hidrológico"
            value={cave.hidrolog_subsystem}
          />
        </>
      )}
    </BasicCard>
  )
}
