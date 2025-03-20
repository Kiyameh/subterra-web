import DownAnchor from '@/components/Molecules/buttons/down-anchor'
import React from 'react'
import {IoMdInformationCircleOutline} from 'react-icons/io'
import {LuBox} from 'react-icons/lu'
import {MdStorage} from 'react-icons/md'
import PageContainer from '@/components/Organisms/theme/page-container'
import BasicCard from '@/components/Molecules/boxes/basic-card'

export default function AboutSection() {
  return (
    <PageContainer
      className="justify-evenly"
      id="about-section"
    >
      <div className="flex flex-wrap gap-5  justify-center">
        <BasicCard
          cardHeader={
            <div className="flex items-center gap-4">
              <IoMdInformationCircleOutline className="text-3xl" />
              <h2 className="text-xl">¿Que es Subterra?</h2>
            </div>
          }
        >
          <p className="text-center">
            Subterra es una base de datos en la nube para la documentación de
            <span className="text-emphasis mx-1">cavidades subterráneas.</span>
          </p>
          <p className="text-center">
            Permite a los espeleólogos almacenar, compartir y consultar
            información sobre cavidades, complejos karsticos y otros elementos
            relacionados con la exploración subterránea.
          </p>
        </BasicCard>

        <BasicCard
          cardHeader={
            <div className="flex items-center gap-4">
              <LuBox className="text-3xl" />
              <h2 className="text-xl">Instancias</h2>
            </div>
          }
        >
          <p className="text-center">
            Subtera funciona mediante instancias. Cada instancia es una base de
            datos de un territorio concreto, mantenida por un grupo de
            espeleólogos.{' '}
          </p>
          <p className="text-center">
            Las instancias pueden ser
            <span className="text-emphasis mx-1">públicas o privadas</span>, y
            pueden ser consultadas por cualquier usuario de Subterra.
          </p>
        </BasicCard>

        <BasicCard
          cardHeader={
            <div className="flex items-center gap-4">
              <MdStorage className="text-3xl" />
              <h2 className="text-xl">Datos</h2>
            </div>
          }
        >
          <p className="text-center">
            En subterra se almacenan datos de
            <span className="text-emphasis mx-1">
              cavidades, de complejos karsticos, de grupos espelologicos y de
              exploraciones.
            </span>
          </p>
          <p className="text-center">
            Todos esos datos se relacionan entre sí, permitiendo una
            trazabilidad completa de cada exploración.
          </p>
        </BasicCard>
      </div>
      <nav>
        <DownAnchor href="#start-section" />
      </nav>
    </PageContainer>
  )
}
