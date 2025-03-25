import React from 'react'

import {getOneInstance} from '@/database/services/Instance/getOneInstance'
import {type InstanceWithUsers} from '@/database/services/Instance/getOneInstance'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {BooleanSlot} from '@/components/Molecules/slots/chip-slots'
import {LinkSlot} from '@/components/Molecules/slots/link-slots'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

import {IoMdInformationCircle} from 'react-icons/io'

/**
 * @version 1
 * @description Muestra la información de una instancia
 * @param instanceName Nombre de la instancia
 */

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
