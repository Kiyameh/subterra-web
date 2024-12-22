import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import GroupsBoard from '@/components/_Organisms/boards/all-groups-board'
import PageContainer from '@/components/theming/page-container'
import React from 'react'

export default function GroupPage() {
  return (
    <PageContainer>
      <CardWithHeader cardSubHeader="Grupos registrados">
        <GroupsBoard />
      </CardWithHeader>
    </PageContainer>
  )
}
