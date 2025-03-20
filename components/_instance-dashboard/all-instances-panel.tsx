import React from 'react'
import InstanceCard from '@/components/cards/instance-card'
import {
  getAllInstances,
  InstanceWithOwner,
} from '@/database/services/Instance/getAllInstances'

import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

/**
 * @version 1
 * @description Panel que muestra todas las instancias
 */
export default async function AllInstancesPanel() {
  const instances = (await getAllInstances()).content as InstanceWithOwner[]

  if (!instances) return <FetchingErrorButton />

  return (
    <>
      {instances &&
        instances.map((instance) => (
          <InstanceCard
            key={instance.name}
            instance={instance}
          />
        ))}
    </>
  )
}
