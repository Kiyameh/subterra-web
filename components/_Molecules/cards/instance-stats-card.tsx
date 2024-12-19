import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {getInstanceStats} from '@/database/services/instance.services'
import React from 'react'
import {ImStatsBars} from 'react-icons/im'

export default async function InstanceStatsCard({
  editorsLength,
  instanceId,
}: {
  editorsLength: number
  instanceId: string
}) {
  const stats = (await getInstanceStats(instanceId)).content as {
    numberOfCaves: number
    numberOfSystems: number
    numberOfExplorations: number
  }

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
      <TextSlot
        label="Editores"
        value={editorsLength}
      />
      <TextSlot
        label="Cavidades"
        value={stats.numberOfCaves}
      />
      <TextSlot
        label="Sistemas"
        value={stats.numberOfSystems}
      />
      <TextSlot
        label="Exploraciones"
        value={stats.numberOfExplorations}
      />
    </BasicCard>
  )
}
