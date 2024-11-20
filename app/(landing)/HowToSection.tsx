import DownAnchor from '@/components/navigation/down-anchor'
import React from 'react'

import {FaPersonHiking} from 'react-icons/fa6'
import {MdGroup} from 'react-icons/md'

import LinkButton from '@/components/navigation/link-button'
import GlassCard from '@/components/containing/glass-card'

export default function HowToSection() {
  return (
    <section
      id="start-section"
      className="w-full min-h-screen  p-5 flex flex-col justify-evenly items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{backgroundImage: 'url(/stock/h7.jpg)'}}
    >
      <div className="flex flex-wrap gap-5 justify-center">
        <GlassCard
          title="Espeleologo"
          icon={<FaPersonHiking className="w-7 h-7" />}
          content="Si eres un espeleologo, puedes crear tu cuenta de usuario y consultar los datos de las instancias públicas. Tambien puedes inscribirte dentro de un club y colaborar con su propia base de datos."
          footer={
            <LinkButton
              label="Crea tu cuenta"
              href="/auth/register"
            />
          }
        />

        <GlassCard
          title="Grupo de espeleología"
          icon={<MdGroup className="w-7 h-7" />}
          content="Si eres un club, puedes crear un perfil de grupo, inscribir a los miembros y asignarles diferentes roles. Estos podran contribuir a la base de datos del grupo con cavidades exploradas, informes de exploración, y mucho más."
          footer={
            <LinkButton
              label="Despliega tu propia instancia"
              href="/create-instance"
            />
          }
        />
      </div>
      <nav>
        <DownAnchor href="#instances-section" />
      </nav>
    </section>
  )
}
