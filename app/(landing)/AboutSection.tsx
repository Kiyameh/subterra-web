import DownAnchor from '@/components/navigation/down-anchor'
import React from 'react'
import {MdInfo} from 'react-icons/md'
import {MdMap} from 'react-icons/md'
import {MdStorage} from 'react-icons/md'
import SolidCard from '@/components/containing/solid-card'

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="w-full min-h-screen  p-5 flex flex-col justify-evenly items-center bg-gray-700  "
      style={{backgroundImage: 'url(/backgrounds/topography.svg)'}}
    >
      <div className="flex flex-wrap gap-5  justify-center">
        <SolidCard
          title="¿Que es Subterra?"
          icon={<MdInfo className="w-7 h-7" />}
          content="Subterra es una base de datos en la nube para la documentación de cavidades subterráneas. Permite a los espeleólogos almacenar, compartir y consultar información sobre cavidades, complejos karsticos y otros elementos relacionados con la exploración subterránea."
        />
        <SolidCard
          title="Instancias"
          icon={<MdMap className="w-7 h-7" />}
          content="Subtera funciona mediante instancias. Cada instancia es una base de datos de un territorio concreto, mantenida por un grupo de espeleólogos. Las instancias pueden ser públicas o privadas, y pueden ser consultadas por cualquier usuario de Subterra."
        />
        <SolidCard
          title="Datos"
          icon={<MdStorage className="w-7 h-7" />}
          content="En subterra se almacenan datos de cavidades, de complejos karsticos, de grupos espelologicos y de exploraciones. Todos esos datos se relacionan entre sí, permitiendo una trazabilidad completa de cada exploración."
        />
      </div>
      <nav>
        <DownAnchor href="#start-section" />
      </nav>
    </section>
  )
}
