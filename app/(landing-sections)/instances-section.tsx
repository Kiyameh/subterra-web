import React, {Suspense} from 'react'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import DownAnchor from '@/components/Molecules/buttons/down-anchor'
import PageContainer from '@/components/Organisms/theme/page-container'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import AllInstancesPanel from '@/components/Templates/instances/all-instances-panel'

import {LuBox} from 'react-icons/lu'

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
