import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import {LinkSlot} from '../../_Atoms/slots/link-slots'
import {TextSlot} from '../../_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {MdAlternateEmail} from 'react-icons/md'
import {getOneGroup, GroupWithUsers} from '@/database/services/group.actions'

import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

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
