import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {FaRegCircle} from 'react-icons/fa'
import {CaveSlot} from '@/components/_Atoms/slots/documents-slots'
import {PlainCave} from '@/database/services/cave.actions'

export default function CavesCard({caves}: {caves: PlainCave[]}) {
  return (
    <BasicCard
      key="caves_card"
      cardHeader={
        <CardTitle
          title={'Cavidades del sistema'}
          icon={<FaRegCircle />}
        />
      }
    >
      {caves.reverse().map((cave) => (
        <CaveSlot
          key={cave._id}
          cave={cave}
        />
      ))}
    </BasicCard>
  )
}
