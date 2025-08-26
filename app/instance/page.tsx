import {Suspense} from 'react'
import {connection} from 'next/server'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import PageContainer from '@/components/Organisms/theme/page-container'
import AllInstancesPanel from '@/components/Templates/instances/all-instances-panel'

export default async function InstanceListPage() {
  // Forzar renderizado dinámico:
  await connection()
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
