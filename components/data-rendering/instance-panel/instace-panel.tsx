import getAllInstances from '@/database/actions/data/getAllInstances'
import React from 'react'
import InstanceCard from './Instance-card'
import {Instance} from '@/database/models/Instance.model'

export default async function InstancePanel() {
  const data = await getAllInstances()
  const instances = data.content as Instance[]
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
