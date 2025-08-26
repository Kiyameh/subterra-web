'use client'
import React from 'react'

import {type PlatformObject} from '@/database/models/Platform.model'
import {deleteInstanceRequest} from '@/database/services/Platform/deleteInstanceRequest'

import {Button} from '@/components/Atoms/button'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import {BooleanSlot} from '@/components/Molecules/slots/chip-slots'

import {MdDelete} from 'react-icons/md'
import {BiMessageAltAdd} from 'react-icons/bi'

/**
 * @version 2
 * @description Panel en el que se muestran las solicitudes de instancia y se pueden eliminar
 * @param messages - Array de solicitudes de instancia
 */

export default function InstanceMessagesBoard({
  messages,
}: {
  messages: PlatformObject['instance_requests']
}) {
  const [cards, setCards] = React.useState(messages)

  async function handleDelete(id: string) {
    const answer = await deleteInstanceRequest(id)
    if (answer.ok) {
      setCards(cards.filter((card) => card._id.toString() !== id))
    } else {
      console.error(answer.message)
    }
  }

  return (
    <CardWithHeader
      defaultWidth="lg"
      cardSubHeader={
        <div className="flex items-center gap-2 text-xl">
          <BiMessageAltAdd className="text-3xl text-staff" />
          <span>Solicitudes de instancia</span>
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
            <span className="text-xs ">{`Solicitud #${card._id.toString()}`}</span>
          </div>

          <TextSlot
            label="Usuario"
            value={card.user.toString()}
          />
          <TextSlot
            label="Grupo"
            value={card.group.toString()}
          />
          <TextSlot
            label="Nombre"
            value={card.fullname}
          />
          <TextSlot
            label="Descripción"
            value={card.description}
          />
          <TextSlot
            label="Territorio"
            value={card.territory}
          />
          <TextSlot
            label="Mensaje"
            value={card.message}
          />
          <TextSlot
            label="Intancia Maestra"
            value={card.master_instance}
          />
          <BooleanSlot
            label="Visibilidad pública"
            value={card.public_visibility}
          />
          <BooleanSlot
            label="Edición pública"
            value={card.public_edition}
          />
        </div>
      ))}
    </CardWithHeader>
  )
}
