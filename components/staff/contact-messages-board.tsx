import React from 'react'
import BasicCard from '@/components/containing/basic-card'
import {LinkSlot} from '@/components/boards/_slots/link-slots'
import {TextSlot} from '@/components/boards/_slots/text-slots'
import {PlatformObject} from '@/database/models/Platform.model'

export default function ContactMessagesBoard({
  messages,
}: {
  messages: PlatformObject['contact_messages']
}) {
  return (
    <BasicCard
      defaultWidth="xl"
      cardHeader="Mensajes de contacto"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 border border-muted-foreground rounded-lg p-4 my-2"
        >
          <TextSlot
            label="Usuario"
            value={message.user.toString()}
          />
          <LinkSlot
            label="Email"
            value={message.email}
            type="email"
          />
          <TextSlot
            label="Asunto"
            value={message.subject}
          />
          <TextSlot
            label="Mensaje"
            value={message.message}
          />
        </div>
      ))}
    </BasicCard>
  )
}
