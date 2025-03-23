import React from 'react'

import {PlainCave} from '@/database/services/Cave/getPlainCave'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {MdOutlineScience} from 'react-icons/md'

/**
 * @version 2
 * @description Muestra la información científica de una cavidad
 * @param document documento de la cavidad
 */

export default function CaveScienceCard({document}: {document: PlainCave}) {
  return (
    <BasicCard
      className="w-full"
      key="science_card"
      cardHeader={
        <CardTitle
          title={'Información científica'}
          icon={<MdOutlineScience />}
        />
      }
    >
      <TextSlot
        label="Era geológica"
        value={document.geolog_age}
      />
      <TextSlot
        label="Litología geológica"
        value={document.geolog_litology}
      />
      <TextSlot
        textArea
        label="Arqueología"
        value={document.arqueolog}
      />
      <TextSlot
        textArea
        label="Paleontología"
        value={document.paleontolog}
      />
      <TextSlot
        textArea
        label="Mineralogía"
        value={document.mineralog}
      />
      <TextSlot
        textArea
        label="Contaminación"
        value={document.contamination}
      />
      <TextSlot
        textArea
        label="Biología"
        value={document.biolog}
      />
      <TextSlot
        label="Sistema hidrológico"
        value={document.hidrolog_system}
      />
      <TextSlot
        label="Subsistema hidrológico"
        value={document.hidrolog_subsystem}
      />
    </BasicCard>
  )
}
