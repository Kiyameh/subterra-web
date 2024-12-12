import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'
import {TextSlot} from '../../_Atoms/slots/text-slots'

interface DescriptionCardProps {
  title?: string
  description?: string
}
export default function DescriptionCard({
  title = 'Descripción',
  description,
}: DescriptionCardProps) {
  return (
    <BasicCard cardHeader={title}>
      <TextSlot
        label="Descripción del grupo"
        value={description}
      />
    </BasicCard>
  )
}
