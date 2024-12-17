import React from 'react'
import {PopulatedCave} from '@/database/models/Cave.model'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {MdOutlineScience} from 'react-icons/md'
import {PopulatedSystem} from '@/database/models/System.model'

export default function ScienceCard({
  document,
}: {
  document: PopulatedCave | PopulatedSystem
}) {
  return (
    <BasicCard
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
