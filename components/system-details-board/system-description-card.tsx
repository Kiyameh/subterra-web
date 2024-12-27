import React from 'react'

import {getPlainSystem, PlainSystem} from '@/database/services/system.actions'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import Divider from '@/components/_Atoms/boxes/divider'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

import {BsCardText} from 'react-icons/bs'

/**
 * @version 1
 * @description Muestra la descripción de un sistema
 * @param systemId Id del sistema
 */

export default async function SystemDescriptionCard({
  systemId,
}: {
  systemId: string
}) {
  // Obtener la cavidad
  const system = (await getPlainSystem(systemId)).content as PlainSystem | null

  return (
    <BasicCard
      key="description_card"
      cardHeader={
        <CardTitle
          title="Descipciones"
          icon={<BsCardText />}
        />
      }
    >
      {!system ? (
        <FetchingErrorButton />
      ) : (
        <>
          <TextSlot
            label="Descripción general"
            value={system.description}
          />
          <Divider text="Exploraciones" />
          <TextSlot
            label="Historia de exploración"
            value={system.exploration_description}
          />
        </>
      )}
    </BasicCard>
  )
}
