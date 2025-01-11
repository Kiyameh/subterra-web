import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import SkeletonCard from '@/components/cards/skeleton-card'
import AllInstancesPanel from '@/components/_instance-dashboard/all-instances-panel'
import PageContainer from '@/components/theming/page-container'
import {Suspense} from 'react'

export default function InstanceListPage() {
  return (
    <PageContainer>
      <CardWithHeader
        cardSubHeader={<h2 className="text-xl">Instancias desplegadas</h2>}
      />
      <div className="max-w-full flex flex-wrap justify-center gap-4">
        <Suspense
          fallback={
            <>
              <SkeletonCard defaultWidth="sm" />
              <SkeletonCard defaultWidth="sm" />
              <SkeletonCard defaultWidth="sm" />
            </>
          }
        >
          <AllInstancesPanel />
        </Suspense>
      </div>
    </PageContainer>
  )
}
