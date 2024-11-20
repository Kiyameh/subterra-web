import SolidCard from '@/components/containing/solid-card'
import InstancePanel from '@/components/data-rendering/instance-panel/instace-panel'
import React from 'react'
import {LuBox} from 'react-icons/lu'

export default function InstancesSection() {
  return (
    <section
      id="instances-section"
      className="w-full min-h-screen  p-5 flex flex-col justify-evenly items-center bg-background "
      style={{backgroundImage: 'url(/backgrounds/topography.svg)'}}
    >
      <SolidCard
        className=" mb-5"
        title="Instancias"
        icon={<LuBox className="w-7 h-7" />}
        content="Aquí puedes encontrar las instancias desplegadas actualmente en Subterra."
      />
      <InstancePanel />
    </section>
  )
}
