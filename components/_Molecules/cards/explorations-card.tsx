import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {MdOutlineExplore} from 'react-icons/md'
import {ExplorationSlot} from '@/components/_Atoms/slots/documents-slots'
import {PlainExploration} from '@/database/services/exploration.actions'

export default function ExplorationsCards({
  explorations,
}: {
  explorations: PlainExploration[]
}) {
  return (
    <BasicCard
      key="explorations_card"
      cardHeader={
        <CardTitle
          title={'Ultimas exploraciones'}
          icon={<MdOutlineExplore />}
        />
      }
    >
      {explorations.reverse().map((exploration) => (
        <ExplorationSlot
          key={exploration._id}
          exploration={exploration}
        />
      ))}
    </BasicCard>
  )
}
