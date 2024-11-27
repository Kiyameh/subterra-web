import React from 'react'
import InstanceCard from './Instance-card'
import {getAllInstances} from '@/database/services/instance.services'
import {PopulatedInstance} from '@/database/models/Instance.model'
import NotFoundCard from '@/components/displaying/404-not-found'

export default async function InstancePanel() {
  const answer = await getAllInstances()
  if (!answer.ok)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="No se han podido cargar las instancias. Intentalo de nuevo más tarde."
      />
    )

  const instances = answer.content as PopulatedInstance[]
  return (
    <section
      id="instance-panel"
      className="max-w-5xl flex flex-wrap gap-5 justify-center"
    >
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
