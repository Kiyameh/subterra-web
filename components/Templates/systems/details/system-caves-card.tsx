import React from 'react'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {FaRegCircle} from 'react-icons/fa'
import {CaveSlot} from '@/components/Molecules/slots/documents-slots'
import {getPopulatedSystem} from '@/database/services/System/getPopulatedSystem'
import {PopulatedSystem} from '@/database/services/System/getPopulatedSystem'

/**
 * @version 1
 * @description Muestra las cavidades de un sistema
 * @param systemId Id del sistema
 */

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
