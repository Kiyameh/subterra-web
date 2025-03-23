import React from 'react'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import {MultiTextSlot} from '@/components/Molecules/slots/text-slots'
import {BooleanSlot} from '@/components/Molecules/slots/chip-slots'
import {MultiChipSlot} from '@/components/Molecules/slots/chip-slots'
import {DistanceSlot} from '@/components/Molecules/slots/number-slots'

import {IoMdInformationCircle} from 'react-icons/io'
import {PlainCave} from '@/database/services/Cave/getPlainCave'

/**
 * @version 1
 * @description Muestra la información general de una cavidad
 * @param document documento de la cavidad
 */

export default function CaveInfoCard({document}: {document: PlainCave}) {
  return (
    <BasicCard
      className="w-full"
      key="cave_info_card"
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

      <MultiChipSlot
        label="Morfología"
        values={document.cave_shapes}
      />
      <BooleanSlot
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

      <p>AQUÍ IRA EL CARD DE SISTEMA</p>
    </BasicCard>
  )
}
