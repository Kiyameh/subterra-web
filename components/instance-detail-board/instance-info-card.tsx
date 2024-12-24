import React from 'react'
import {InstanceWithUsers} from '@/database/services/instance.actions'
import {getOneInstance} from '@/database/services/instance.actions'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {BooleanSlot} from '@/components/_Atoms/slots/chip-slots'
import {LinkSlot} from '@/components/_Atoms/slots/link-slots'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {IoMdInformationCircle} from 'react-icons/io'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

export default async function InstanceInfoCard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as InstanceWithUsers | null

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
      {!instance ? (
        <FetchingErrorButton />
      ) : (
        <>
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
        </>
      )}
    </BasicCard>
  )
}
