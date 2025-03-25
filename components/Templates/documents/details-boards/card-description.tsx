import React from 'react'

import {type PlainCave} from '@/database/services/Cave/getPlainCave'
import {type PlainSystem} from '@/database/services/System/getPlainSystem'

import {TextSlot} from '@/components/Molecules/slots/text-slots'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'

import {BsCardText} from 'react-icons/bs'

/**
 * @version 3
 * @description Muestra la descripción de un documento
 * @param document documento
 */

export default function DescriptionCard({
  document,
}: {
  document: PlainCave | PlainSystem
}) {
  return (
    <BasicCard
      className="w-full"
      key="description_card"
      cardHeader={
        <CardTitle
          title="Descipciones"
          icon={<BsCardText />}
        />
      }
    >
      <>
        <TextSlot
          label="Descripción general"
          value={document.description}
        />
      </>
    </BasicCard>
  )
}
