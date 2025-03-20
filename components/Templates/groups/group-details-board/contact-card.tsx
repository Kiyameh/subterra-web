import React from 'react'

import {
  getOneGroup,
  GroupWithUsers,
} from '@/database/services/Group/getOneGroup'

import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import {LinkSlot} from '@/components/Molecules/slots/link-slots'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'

import {MdAlternateEmail} from 'react-icons/md'

/**
 * @version 1
 * @description Muestra la información de contacto de un grupo
 * @param groupName Nombre del grupo
 */

export default async function ContactCard({groupName}: {groupName: string}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as GroupWithUsers | null

  if (!group) {
    return (
      <BasicCard
        key="contact_card"
        cardHeader={
          <CardTitle
            title="Información de contacto"
            icon={<MdAlternateEmail />}
          />
        }
      >
        <FetchingErrorButton />
      </BasicCard>
    )
  }

  const address = [group.street, group.portal_number, group.floor, group.door]
    .filter(Boolean)
    .join(', ')

  return (
    <BasicCard
      key="contact_card"
      cardHeader={
        <CardTitle
          title="Información de contacto"
          icon={<MdAlternateEmail />}
        />
      }
    >
      <TextSlot
        label="Dirección"
        value={address}
      />
      <TextSlot
        label="Código postal"
        value={group.postal_code}
      />
      <TextSlot
        label="Ciudad"
        value={group.city}
      />
      <TextSlot
        label="Provincia"
        value={group.province}
      />
      <TextSlot
        label="País"
        value={group.country}
      />
      <LinkSlot
        label="Teléfono"
        type="phone"
        value={group.phone}
      />
      <LinkSlot
        label="Email"
        type="email"
        value={group.email}
      />
      <LinkSlot
        label="Web"
        type="external"
        value={group.webpage}
      />
    </BasicCard>
  )
}
