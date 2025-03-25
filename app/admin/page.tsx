import React from 'react'

import {getOnePlatform} from '@/database/services/Platform/getOnePlatform'
import {type PlatformObject} from '@/database/models/Platform.model'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import {TextSlot} from '@/components/Molecules/slots/text-slots'

import {PiAvocadoFill} from 'react-icons/pi'

export default async function StaffDashboardLanding() {
  // Obtener la plataforma
  const subterra = (await getOnePlatform()).content as
    | PlatformObject
    | undefined

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
