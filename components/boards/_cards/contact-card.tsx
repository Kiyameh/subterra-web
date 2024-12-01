import React from 'react'
import BasicCard from '@/components/containing/basic-card'
import {LinkSlot} from '../_slots/link-slots'
import {TextSlot} from '../_slots/text-slots'

interface ContactCardProps {
  street?: string
  portal_number?: string
  floor?: string
  door?: string
  postal_code?: number
  city?: string
  province?: string
  country?: string
  phone?: string
  email?: string
  webpage?: string
}

export default function ContactCard({
  street,
  portal_number,
  floor,
  door,
  postal_code,
  city,
  province,
  country,
  phone,
  email,
  webpage,
}: ContactCardProps) {
  const address = [street, portal_number, floor, door]
    .filter(Boolean)
    .join(', ')

  return (
    <BasicCard cardHeader="Datos de contacto">
      <TextSlot
        label="Dirección"
        value={address}
      />
      <TextSlot
        label="Código postal"
        value={postal_code}
      />
      <TextSlot
        label="Ciudad"
        value={city}
      />
      <TextSlot
        label="Provincia"
        value={province}
      />
      <TextSlot
        label="País"
        value={country}
      />
      <LinkSlot
        label="Teléfono"
        type="phone"
        value={phone}
      />
      <LinkSlot
        label="Email"
        type="email"
        value={email}
      />
      <LinkSlot
        label="Web"
        type="external"
        value={webpage}
      />
    </BasicCard>
  )
}
