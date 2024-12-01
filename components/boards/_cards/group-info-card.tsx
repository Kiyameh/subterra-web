import BasicCard from '@/components/containing/basic-card'
import React from 'react'
import {TextSlot} from '../_slots/text-slots'
import {MultiChipSlot} from '../_slots/chip-slots'

interface GroupInfoCardProps {
  fullname: string
  name: string
  _id: string
  acronym?: string
  group_categories?: string[]
}

export default function GroupInfoCard({
  fullname,
  name,
  acronym,
  _id,
  group_categories,
}: GroupInfoCardProps) {
  return (
    <BasicCard cardHeader="Información del grupo">
      <TextSlot
        label="ID"
        value={_id}
      />
      <TextSlot
        label="Ácronimo"
        value={acronym}
      />
      <TextSlot
        label="Nombre completo"
        value={fullname}
      />
      <TextSlot
        label="Nombre corto"
        value={name}
      />
      <MultiChipSlot
        label="Categorias"
        values={group_categories}
      />
    </BasicCard>
  )
}
