import BasicCard from '@/components/containing/basic-card'
import {PopulatedGroup} from '@/database/models/Group.model'
import React from 'react'

interface MembersAdminCardProps {
  members: PopulatedGroup['members']
  groupId: string
}
export default function MembersAdminCard({
  members,
  groupId,
}: MembersAdminCardProps) {
  return (
    <BasicCard
      defaultWidth="xl"
      cardHeader={<h2 className="text-xl font-bold">Miembros</h2>}
    >
      <div>{JSON.stringify(groupId)}</div>
      <div>{JSON.stringify(members)}</div>
    </BasicCard>
  )
}
