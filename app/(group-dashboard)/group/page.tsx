import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import SkeletonCard from '@/components/cards/skeleton-card'
import AllGroupsPanel from '@/components/_group-dashboard/all-groups-panel'
import PageContainer from '@/components/theming/page-container'
import React, {Suspense} from 'react'
import {FaUserGroup} from 'react-icons/fa6'

export default function GroupListPage() {
  return (
    <PageContainer>
      <Suspense fallback={<SkeletonCard defaultWidth="md" />}>
        <CardWithHeader
          cardSubHeader={
            <div className="flex gap-4">
              <FaUserGroup className="text-3xl" />
              <h2 className="text-2xl font-bold">Grupos</h2>
            </div>
          }
          defaultWidth="md"
        >
          <AllGroupsPanel />
        </CardWithHeader>
      </Suspense>
    </PageContainer>
  )
}
