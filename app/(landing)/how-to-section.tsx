import DownAnchor from '@/components/_Atoms/buttons/down-anchor'
import React from 'react'

import {FaPersonHiking} from 'react-icons/fa6'
import {MdGroup} from 'react-icons/md'

import LinkButton from '@/components/_Atoms/buttons/link-button'
import BasicCard from '@/components/_Atoms/boxes/basic-card'

export default function HowToSection() {
  return (
    <section
      id="start-section"
      className="w-full min-h-screen  p-5 flex flex-col justify-evenly items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{backgroundImage: 'url(/stock/h7.jpg)'}}
    >
      <div className="flex flex-wrap gap-5 justify-center">
        <BasicCard
          glassmorphism
          cardHeader={
            <div className="flex items-center gap-4">
              <MdGroup className="text-3xl" />
              <h2 className="text-xl">Grupo de espeleología</h2>
            </div>
          }
          cardFooter={
            <LinkButton
              label="Registra tu grupo"
              href="/create-group"
            />
          }
        >
          <p className="text-center">
            Si eres un club, puedes crear un perfil de grupo, inscribir a los
            miembros y asignarles diferentes roles. Estos podran contribuir a la
            base de datos del grupo con cavidades exploradas, informes de
            exploración, y mucho más.
          </p>
        </BasicCard>

        <BasicCard
          glassmorphism
          cardHeader={
            <div className="flex items-center gap-4">
              <FaPersonHiking className="text-3xl" />
              <h2 className="text-xl">Espeleólogo</h2>
            </div>
          }
          cardFooter={
            <LinkButton
              label="Crea tu cuenta"
              href="/auth/register"
            />
          }
        >
          <p className="text-center">
            Si eres un espeleólogo, puedes consultar las instancias públicas que
            ya existen, o solicitar el acceso a uno de los grupos y colaborar
            con su propia base de datos.
          </p>
        </BasicCard>
      </div>
      <nav>
        <DownAnchor href="#instances-section" />
      </nav>
    </section>
  )
}
