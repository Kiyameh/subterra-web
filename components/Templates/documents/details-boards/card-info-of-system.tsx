import React from 'react'

import { type PlainSystem } from '@/database/services/System/getPlainSystem'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import { TextSlot } from '@/components/Molecules/slots/text-slots'
import { MultiTextSlot } from '@/components/Molecules/slots/text-slots'
import { BooleanSlot } from '@/components/Molecules/slots/chip-slots'
import { DistanceSlot } from '@/components/Molecules/slots/number-slots'

import { IoMdInformationCircle } from 'react-icons/io'

/**
 * @version 1
 * @description Muestra la información general de un sistema
 * @param document documento
 */

export default function SystemInfoCard({ document }: { document: PlainSystem }) {
  return (
    <BasicCard
      className="w-full"
      key="system_info_card"
      cardHeader={
        <CardTitle
          title={'Información general'}
          icon={<IoMdInformationCircle />}
        />
      }
    >
      <TextSlot
        label="ID"
        value={document._id}
      />
      <TextSlot
        label="Catálogo externo"
        value={document.catalog}
      />
      <MultiTextSlot
        label="Siglas de exploración"
        values={document.initials}
      />
      <TextSlot
        label="Nombre"
        value={document.name}
      />
      <MultiTextSlot
        label="Nombres alternativos"
        values={document.alt_names}
      />
      <TextSlot
        label="Macizo montañoso"
        value={document.massif}
      />
      <BooleanSlot
        invertedColor
        label="Regulaciones"
        value={document.regulations}
      />
      <TextSlot
        textArea
        label="Descripción de las regulaciones"
        value={document.regulation_description}
      />
      <DistanceSlot
        label="Longitud"
        valueInMeters={document.length}
      />
      <DistanceSlot
        label="Profundidad"
        valueInMeters={document.depth}
      />
    </BasicCard>
  )
}
