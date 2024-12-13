import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'
import {TextSlot} from '../../_Atoms/slots/text-slots'
import {MultiChipSlot} from '../../_Atoms/slots/chip-slots'
import {IoMdInformationCircle} from 'react-icons/io'
import CardTitle from '@/components/_Atoms/boxes/card-title'

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
    <BasicCard
      cardHeader={
        <CardTitle
          title={'Información general'}
          icon={<IoMdInformationCircle />}
        />
      }
    >
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
