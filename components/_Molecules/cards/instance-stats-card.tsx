import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import React from 'react'
import {ImStatsBars} from 'react-icons/im'

export default function InstanceStatsCard({
  editorsLength,
}: {
  editorsLength: number
}) {
  return (
    <BasicCard
      key="instance_stats_card"
      cardHeader={
        <CardTitle
          title={'Estadisticas'}
          icon={<ImStatsBars />}
        />
      }
    >
      {' '}
      <TextSlot
        label="Editores"
        value={editorsLength}
      />
      <TextSlot
        label="Cavidades"
        value="TODO"
      />
      <TextSlot
        label="Sistemas"
        value="TODO"
      />
      <TextSlot
        label="Exploraciones"
        value="TODO"
      />
    </BasicCard>
  )
}
