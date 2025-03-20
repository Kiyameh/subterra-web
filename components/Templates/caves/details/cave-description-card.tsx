import React from 'react'

import {getPlainCave, PlainCave} from '@/database/services/Cave/getPlainCave'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

import {BsCardText} from 'react-icons/bs'

/**
 * @version 1
 * @description Muestra la descripción de una cavidad
 * @param caveId Id de la cavidad
 */

export default async function CaveDescriptionCard({caveId}: {caveId: string}) {
  // Obtener la cavidad
  const cave = (await getPlainCave(caveId)).content as PlainCave | null

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
      {!cave ? (
        <FetchingErrorButton />
      ) : (
        <>
          <TextSlot
            label="Descripción general"
            value={cave.description}
          />
        </>
      )}
    </BasicCard>
  )
}
