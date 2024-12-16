import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {LinkSlot} from '@/components/_Atoms/slots/link-slots'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {GroupIndex} from '@/database/models/Group.model'
import React from 'react'
import {IoMdInformationCircle} from 'react-icons/io'

export default function InstanceInfoCard({
  _id,
  name,
  fullname,
  acronym,
  owner,
  description,
}: {
  _id: string
  name: string
  fullname: string
  acronym: string
  owner: GroupIndex
  description: string
}) {
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
        label="Nombre corto"
        value={name}
      />
      <TextSlot
        label="Nombre completo"
        value={fullname}
      />
      <TextSlot
        label="Ácronimo"
        value={acronym}
      />
      <LinkSlot
        label="Grupo propietario"
        value={`/group/${owner.name}`}
        showText={owner.fullname}
        type="internal"
      />
      <TextSlot
        label="Descripción"
        value={description}
      />
    </BasicCard>
  )
}
