import React from 'react'

import {PlainSystem} from '@/database/services/System/getPlainSystem'
import {getPlainSystem} from '@/database/services/System/getPlainSystem'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

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
        </>
      )}
    </BasicCard>
  )
}
