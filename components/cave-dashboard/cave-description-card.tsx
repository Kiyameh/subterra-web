import React from 'react'

import {getPlainCave, PlainCave} from '@/database/services/cave.actions'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import Divider from '@/components/_Atoms/boxes/divider'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

import {BsCardText} from 'react-icons/bs'

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
          <Divider text="Localización" />
          <TextSlot
            label="Descipción del acceso"
            value={cave.location_description}
          />
        </>
      )}
    </BasicCard>
  )
}
