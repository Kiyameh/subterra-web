import React from 'react'
import BasicCard from '@/components/containing/basic-card'
import {TextSlot} from '@/components/boards/_slots/text-slots'
import {PlatformObject} from '@/database/models/Platform.model'

export default function InstanceMessagesBoard({
  messages,
}: {
  messages: PlatformObject['instance_requests']
}) {
  return (
    <BasicCard
      defaultWidth="xl"
      cardHeader="Solicitudes de instancia"
    >
      {messages.map((request, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 border border-muted-foreground rounded-lg p-4 my-2"
        >
          <TextSlot
            label="Usuario"
            value={request.user.toString()}
          />
          <TextSlot
            label="Grupo"
            value={request.group.toString()}
          />
          <TextSlot
            label="Nombre"
            value={request.fullname}
          />
          <TextSlot
            label="Descripción"
            value={request.description}
          />
          <TextSlot
            label="Territorio"
            value={request.territory}
          />
          <TextSlot
            label="Roles"
            value={request.roles}
          />
          <TextSlot
            label="Mensaje"
            value={request.message}
          />
        </div>
      ))}
    </BasicCard>
  )
}
