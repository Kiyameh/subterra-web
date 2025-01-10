import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'
import {PiAvocadoFill} from 'react-icons/pi'
import {getOnePlatform} from '@/database/services/platform.services'
import {PlatformObject} from '@/database/models/Platform.model'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'

export default async function StaffDashboardLanding() {
  const subterra = (await getOnePlatform('subterra'))
    .content as PlatformObject | null
  return (
    <BasicCard
      glassmorphism
      cardHeader={
        <div className="flex items-center gap-3">
          <PiAvocadoFill className="text-4xl text-staff" />
          <h1 className="text-xl">Administración de Subterra.app</h1>
        </div>
      }
    >
      <TextSlot
        label="Mensajes de contacto"
        value={subterra?.contact_messages.length}
      />
      <TextSlot
        label="Solicitudes de instancia"
        value={subterra?.instance_requests.length}
      />
    </BasicCard>
  )
}
