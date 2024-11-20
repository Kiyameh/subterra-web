import DownAnchor from '@/components/navigation/down-anchor'
import React from 'react'
import {IoMdInformationCircleOutline} from 'react-icons/io'
import {LuBox} from 'react-icons/lu'
import {MdStorage} from 'react-icons/md'
import SolidCard from '@/components/containing/solid-card'

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="w-full min-h-screen  p-5 flex flex-col justify-evenly items-center bg-background "
      style={{backgroundImage: 'url(/backgrounds/topography.svg)'}}
    >
      <div className="flex flex-wrap gap-5  justify-center">
        <SolidCard
          title="¿Que es Subterra?"
          icon={<IoMdInformationCircleOutline className="w-7 h-7" />}
          className="text-center"
        >
          Subterra es una base de datos en la nube para la documentación de
          <span className="text-emphasis mx-1">cavidades subterráneas.</span>
          <br />
          <br />
          Permite a los espeleólogos almacenar, compartir y consultar
          información sobre cavidades, complejos karsticos y otros elementos
          relacionados con la exploración subterránea.
        </SolidCard>
        <SolidCard
          title="Instancias"
          icon={<LuBox className="w-7 h-7" />}
          className="text-center"
        >
          Subtera funciona mediante instancias. Cada instancia es una base de
          datos de un territorio concreto, mantenida por un grupo de
          espeleólogos.
          <br />
          <br />
          Las instancias pueden ser
          <span className="text-emphasis mx-1">públicas o privadas</span>, y
          pueden ser consultadas por cualquier usuario de Subterra.
        </SolidCard>
        <SolidCard
          title="Datos"
          icon={<MdStorage className="w-7 h-7" />}
          className="text-center"
        >
          En subterra se almacenan datos de
          <span className="text-emphasis mx-1">
            cavidades, de complejos karsticos, de grupos espelologicos y de
            exploraciones.
          </span>
          <br />
          <br />
          Todos esos datos se relacionan entre sí, permitiendo una trazabilidad
          completa de cada exploración.
        </SolidCard>
      </div>
      <nav>
        <DownAnchor href="#start-section" />
      </nav>
    </section>
  )
}
