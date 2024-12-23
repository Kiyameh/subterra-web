import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import GroupsBoard from '@/components/_Organisms/boards/all-groups-board'
import PageContainer from '@/components/theming/page-container'
import React, {Suspense} from 'react'

export default function GroupListPage() {
  return (
    <PageContainer>
      <Suspense fallback={<SkeletonCard className="min-h-[790px]" />}>
        <GroupsBoard />
      </Suspense>
    </PageContainer>
  )
}
