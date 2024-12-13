import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'
import {TextSlot} from '../../_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {BsCardText} from 'react-icons/bs'

interface DescriptionCardProps {
  title?: string
  description?: string
}
export default function DescriptionCard({
  title = 'Descripción',
  description,
}: DescriptionCardProps) {
  return (
    <BasicCard
      cardHeader={
        <CardTitle
          title={title}
          icon={<BsCardText />}
        />
      }
    >
      <TextSlot
        label="Descripción del grupo"
        value={description}
      />
    </BasicCard>
  )
}
