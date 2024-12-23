import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {FaRegCircle} from 'react-icons/fa'
import {CaveSlot} from '@/components/_Atoms/slots/documents-slots'
import {
  getPopulatedSystem,
  PopulatedSystem,
} from '@/database/services/system.actions'

export default async function SystemCavesCard({systemId}: {systemId: string}) {
  // Obtener el sistema
  const system = (await getPopulatedSystem(systemId))
    .content as PopulatedSystem | null

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
      {system?.caves.map((cave) => (
        <CaveSlot
          key={cave._id}
          cave={cave}
        />
      ))}
    </BasicCard>
  )
}
