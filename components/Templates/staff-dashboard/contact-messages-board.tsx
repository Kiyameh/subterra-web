'use client'
import React from 'react'
import {PlatformObject} from '@/database/models/Platform.model'
import {deleteContactMessage} from '@/database/services/Platform/deleteContactMessage'

import {TextSlot} from '@/components/Molecules/slots/text-slots'
import {LinkSlot} from '@/components/Molecules/slots/link-slots'
import {Button} from '@/components/Atoms/button'

import {MdDelete} from 'react-icons/md'
import {BiMessageDots} from 'react-icons/bi'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'

/**
 * @version 2
 * @description Panel en el que se muestran los mensajes de contacto y se pueden eliminar
 * @param messages - Array de mensajes de contacto
 */

export default function ContactMessagesBoard({
  messages,
}: {
  messages: PlatformObject['contact_messages']
}) {
  const [cards, setCards] = React.useState(messages)

  async function handleDelete(id: string) {
    const answer = await deleteContactMessage(id)
    if (answer.ok) {
      setCards(cards.filter((card) => card._id.toString() !== id))
    } else {
      console.error(answer.message)
    }
  }

  return (
    <CardWithHeader
      defaultWidth="xl"
      cardSubHeader={
        <div className="flex items-center gap-2 text-xl">
          <BiMessageDots className="text-3xl text-staff" />
          <span>Mensajes de contacto</span>
        </div>
      }
    >
      {cards.map((card) => (
        <div
          key={card._id.toString()}
          className="flex flex-col gap-1 border border-muted-foreground rounded-lg p-4 my-2"
        >
          <div className="flex gap-2 items-center mb-2">
            <Button
              className="rounded-full"
              size="icon"
              onClick={() => handleDelete(card._id.toString())}
            >
              <MdDelete />
            </Button>
            <span className="text-xs ">{`Mensaje #${card._id.toString()}`}</span>
          </div>
          {card.user && (
            <TextSlot
              label="Usuario"
              value={card.user.toString()}
            />
          )}
          <LinkSlot
            label="Email"
            value={card.email}
            type="email"
          />
          <TextSlot
            label="Asunto"
            value={card.subject}
          />
          <TextSlot
            label="Mensaje"
            value={card.message}
          />
        </div>
      ))}
    </CardWithHeader>
  )
}
