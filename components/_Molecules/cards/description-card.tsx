import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'
import {TextSlot} from '../../_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {BsCardText} from 'react-icons/bs'
import Divider from '@/components/_Atoms/boxes/divider'

export default function DescriptionCard({
  title = 'Descripción',
  description,
  locationDescription,
}: {
  title?: string
  description?: string
  locationDescription?: string
}) {
  return (
    <BasicCard
      key="description_card"
      cardHeader={
        <CardTitle
          title={title}
          icon={<BsCardText />}
        />
      }
    >
      <TextSlot
        textArea
        label="Descripción general"
        value={description}
      />
      {locationDescription && (
        <>
          <Divider text="Localización" />
          <TextSlot
            textArea
            label="Descripción acceso"
            value={locationDescription}
          />
        </>
      )}
    </BasicCard>
  )
}
