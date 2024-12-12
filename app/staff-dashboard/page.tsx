import BasicCard from '@/components/_Atoms/boxes/basic-card'
import PageContainer from '@/components/theming/page-container'
import SquareButton from '@/components/_Atoms/buttons/square-button'
import React from 'react'
import {PiAvocadoFill} from 'react-icons/pi'
import {BiMessageDots} from 'react-icons/bi'
import {FiBox} from 'react-icons/fi'
import Link from 'next/link'

export default function StaffDashboardLanding() {
  return (
    <PageContainer>
      <BasicCard
        glassmorphism
        cardHeader={
          <div className="flex items-center gap-3">
            <PiAvocadoFill className="text-4xl text-staff" />
            <h1 className="text-xl">Administración de Subterra.app</h1>
          </div>
        }
      >
        <div className="flex flex-row gap-2 items-center justify-center">
          <Link href="/staff-dashboard/admin">
            <SquareButton
              color="staff"
              icon={<BiMessageDots />}
              text="Mensajes de contacto"
            />
          </Link>
          <Link href="/staff-dashboard/create-instance">
            <SquareButton
              color="staff"
              icon={<FiBox />}
              text="Solicitudes de instancia"
            />
          </Link>
        </div>
      </BasicCard>
    </PageContainer>
  )
}
