import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {FaRegCircle} from 'react-icons/fa'
import {CaveSlot} from '@/components/_Atoms/slots/documents-slots'
import {CaveObject} from '@/database/models/Cave.model'

export default function CavesCard({caves}: {caves: CaveObject[]}) {
  return (
    <BasicCard
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
