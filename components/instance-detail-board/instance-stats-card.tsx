import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {
  getInstanceStats,
  InstanceWithUsers,
} from '@/database/services/instance.actions'
import {getOneInstance} from '@/database/services/instance.actions'
import React from 'react'
import {ImStatsBars} from 'react-icons/im'

export default async function InstanceStatsCard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as InstanceWithUsers | null

  if (!instance) {
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
        <FetchingErrorButton />
      </BasicCard>
    )
  }

  // Obtener estadísticas de la instancia
  const stats = (await getInstanceStats(instance._id.toString())).content as {
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
        value={instance.editors.length}
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
