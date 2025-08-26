import React, {Suspense} from 'react'
import {connection} from 'next/server'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import PageContainer from '@/components/Organisms/theme/page-container'
import AllGroupsPanel from '@/components/Templates/groups/all-groups-panel'

import {FaUserGroup} from 'react-icons/fa6'

export default async function GroupListPage() {
  // Forzar renderizado dinámico:
  await connection()
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
