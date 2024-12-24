import React from 'react'
import InstanceCard from '@/components/_Molecules/cards/instance-card'
import {
  getAllInstances,
  InstanceWithOwner,
} from '@/database/services/instance.actions'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

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
