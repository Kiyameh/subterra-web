import {PopulatedGroup} from '@/database/models/Group.model'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneGroup} from '@/database/services/group.services'
import {getSomeInstances} from '@/database/services/instance.services'
import React from 'react'
import InstanceCard from '../instance-card'

export default async function GroupInstancesBox({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener instancias populadas del grupo
  const instances = (await getSomeInstances(group?.instances)).content as
    | PopulatedInstance[]
    | null

  return (
    <>
      {instances &&
        instances.map((instance) => {
          return (
            <InstanceCard
              glassmorphism={false}
              key={instance.name}
              instance={instance}
            />
          )
        })}
    </>
  )
}
