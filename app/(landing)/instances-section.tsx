import AllInstancesPanel from '@/components/_instance-dashboard/all-instances-panel'
import React, {Suspense} from 'react'
import {LuBox} from 'react-icons/lu'
import PageContainer from '@/components/theming/page-container'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import DownAnchor from '@/components/_Atoms/buttons/down-anchor'
import SkeletonCard from '@/components/cards/skeleton-card'

export default function InstancesSection() {
  return (
    <PageContainer
      className="justify-center"
      id="instances-section"
    >
      <BasicCard
        cardHeader={
          <div className="flex gap-4">
            <LuBox className="text-3xl" />
            <h2 className="text-2xl font-bold">Instancias</h2>
          </div>
        }
      >
        <p>
          Aquí puedes encontrar las instancias desplegadas actualmente en
          Subterra.
        </p>
      </BasicCard>

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

      <nav>
        <DownAnchor href="#groups-section" />
      </nav>
    </PageContainer>
  )
}
