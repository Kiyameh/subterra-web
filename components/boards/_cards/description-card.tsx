import BasicCard from '@/components/containing/basic-card'
import React from 'react'
import {TextSlot} from '../_slots/text-slots'

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
