import React from 'react'
import {getAllInstances} from '@/database/services/instance.services'
import {PopulatedInstance} from '@/database/models/Instance.model'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import InstanceCard from '@/components/_Molecules/cards/instance-card'

export default async function InstancesBoard() {
  const instances = (await getAllInstances()).content as PopulatedInstance[]

  if (!instances)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="No se han podido cargar las instancias. Intentalo de nuevo más tarde."
      />
    )

  return (
    <section className="max-w-full flex flex-wrap justify-center gap-4">
      {instances &&
        instances.map((instance) => (
          <InstanceCard
            key={instance.name}
            instance={instance}
          />
        ))}
    </section>
  )
}
