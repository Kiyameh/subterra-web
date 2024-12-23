import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import InstancesBoard from '@/components/_Organisms/boards/all-instances-board'
import PageContainer from '@/components/theming/page-container'
import {Suspense} from 'react'

export default function InstanceListPage() {
  return (
    <PageContainer>
      <Suspense
        fallback={
          <div className="max-w-full flex flex-wrap justify-center gap-4">
            <SkeletonCard defaultWidth="sm" />
            <SkeletonCard defaultWidth="sm" />
            <SkeletonCard defaultWidth="sm" />
          </div>
        }
      >
        <InstancesBoard />
      </Suspense>
    </PageContainer>
  )
}
