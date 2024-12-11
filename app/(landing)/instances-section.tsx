import InstancesBoard from '@/components/boards/all-instances-board'
import React from 'react'
import {LuBox} from 'react-icons/lu'
import PageContainer from '@/components/containing/page-container'
import BasicCard from '@/components/containing/basic-card'
import DownAnchor from '@/components/navigation/down-anchor'

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
      <InstancesBoard />
      <nav>
        <DownAnchor href="#groups-section" />
      </nav>
    </PageContainer>
  )
}
