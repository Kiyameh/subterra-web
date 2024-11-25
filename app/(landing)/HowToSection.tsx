import DownAnchor from '@/components/navigation/down-anchor'
import React from 'react'

import {FaPersonHiking} from 'react-icons/fa6'
import {MdGroup} from 'react-icons/md'

import LinkButton from '@/components/navigation/link-button'
import CustomCard from '@/components/containing/custom-card'

export default function HowToSection() {
  return (
    <section
      id="start-section"
      className="w-full min-h-screen  p-5 flex flex-col justify-evenly items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{backgroundImage: 'url(/stock/h7.jpg)'}}
    >
      <div className="flex flex-wrap gap-5 justify-center">
        <CustomCard
          glassmorphism
          title="Espeleologo"
          icon={<FaPersonHiking className="w-7 h-7" />}
          action1={
            <LinkButton
              label="Crea tu cuenta"
              href="/auth/register"
            />
          }
          action2={
            <LinkButton
              variant="secondary"
              label="Inicia sesión"
              href="/auth/login"
            />
          }
        >
          Si eres un espeleologo, puedes consultar las instancias públicas que
          ya existen, o solicitar el acceso a uno de los grupos y colaborar con
          su propia base de datos.
        </CustomCard>

        <CustomCard
          glassmorphism
          title="Grupo de espeleología"
          icon={<MdGroup className="w-7 h-7" />}
          content="Si eres un club, puedes crear un perfil de grupo, inscribir a los miembros y asignarles diferentes roles. Estos podran contribuir a la base de datos del grupo con cavidades exploradas, informes de exploración, y mucho más."
          action1={
            <LinkButton
              label="Registra tu grupo"
              href="/create-group"
            />
          }
          action2={
            <LinkButton
              variant="ghost"
              label="Solicita tu propia instancia"
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
