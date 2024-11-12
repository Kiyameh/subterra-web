import getAllInstances from '@/database/read-actions/getAllInstances'
import React from 'react'
import InstanceCard from './Instance-card'

export default async function InstancePanel() {
  const data = await getAllInstances()

  return (
    <section
      id="instance-panel"
      className="max-w-5xl flex flex-wrap gap-2"
    >
      {data.content &&
        data.content.map((instance) => (
          <InstanceCard
            key={instance.name}
            instance={instance}
          />
        ))}
    </section>
  )
}
