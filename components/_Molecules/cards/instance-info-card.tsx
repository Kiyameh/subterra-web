import React from 'react'
import {PopulatedInstance} from '@/database/models/Instance.model'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {BooleanSlot} from '@/components/_Atoms/slots/chip-slots'
import {LinkSlot} from '@/components/_Atoms/slots/link-slots'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {IoMdInformationCircle} from 'react-icons/io'

export default function InstanceInfoCard({
  instance,
}: {
  instance: PopulatedInstance
}) {
  return (
    <BasicCard
      key="instance_info_card"
      cardHeader={
        <CardTitle
          title={'Información general'}
          icon={<IoMdInformationCircle />}
        />
      }
    >
      <TextSlot
        label="ID"
        value={instance._id}
      />
      <TextSlot
        label="Nombre corto"
        value={instance.name}
      />
      <TextSlot
        label="Nombre completo"
        value={instance.fullname}
      />
      <TextSlot
        label="Ácronimo"
        value={instance.acronym}
      />
      <LinkSlot
        label="Grupo propietario"
        value={`/group/${instance.owner.name}`}
        showText={instance.owner.fullname}
        type="internal"
      />
      <TextSlot
        label="Descripción"
        value={instance.description}
      />
      <BooleanSlot
        label="Edición pública"
        value={instance.public_edition}
      />
      <BooleanSlot
        label="Visibilidad pública"
        value={instance.public_visibility}
      />
    </BasicCard>
  )
}
