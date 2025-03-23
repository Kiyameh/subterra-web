import React from 'react'

import {PlainCave} from '@/database/services/Cave/getPlainCave'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'

import {BsCardText} from 'react-icons/bs'

/**
 * @version 2
 * @description Muestra la descripción de una cavidad
 * @param document documento de la cavidad
 */

export default function CaveDescriptionCard({document}: {document: PlainCave}) {
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
