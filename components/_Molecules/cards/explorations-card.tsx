import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {MdOutlineExplore} from 'react-icons/md'
import {ExplorationObject} from '@/database/models/Exploration.model'
import {ExplorationSlot} from '@/components/_Atoms/slots/documents-slots'

export default function ExplorationsCards({
  explorations,
}: {
  explorations: ExplorationObject[]
}) {
  return (
    <BasicCard
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
