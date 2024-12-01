import BasicCard from '@/components/containing/basic-card'
import {PopulatedGroup} from '@/database/models/Group.model'
import React from 'react'

interface MembersCardProps {
  members: PopulatedGroup['members']
}
export default function MembersCard({members}: MembersCardProps) {
  return (
    <BasicCard
      defaultWidth="xl"
      cardHeader={<h2 className="text-xl font-bold">Miembros</h2>}
    >
      <div>{JSON.stringify(members)}</div>
    </BasicCard>
  )
}
