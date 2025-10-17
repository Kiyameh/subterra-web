import React from 'react'

import { type PlainCave } from '@/database/services/Cave/getPlainCave'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import Divider from '@/components/Molecules/boxes/divider'
import { MultiTextSlot } from '@/components/Molecules/slots/text-slots'
import { TextSlot } from '@/components/Molecules/slots/text-slots'
import { ChipSlot, MultiDateSlot } from '@/components/Molecules/slots/chip-slots'
import { DistanceSlot } from '@/components/Molecules/slots/number-slots'

import { FaMapLocationDot } from 'react-icons/fa6'
import { FaCheckCircle } from 'react-icons/fa'

/**
 * @version 2
 * @description Muestra la localización de una cavidad
 * @param document documento de la cavidad
 */

export default function CaveLocationCard({ document }: { document: PlainCave }) {
  return (
    <BasicCard
      className="w-full"
      key="cave_location_card"
      cardHeader={
        <CardTitle
          title={'Información de localización'}
          icon={<FaMapLocationDot />}
        />
      }
    >
      <Divider text="Coordenadas" />
      <ChipSlot
        label="Datum"
        value={document.coordinates?.coord_proyec}
      />
      <ChipSlot
        label="Formato"
        value={document.coordinates?.coord_format}
      />
      <ChipSlot
        label="Zona UTM"
        value={document.coordinates?.utm_zone}
      />
      <DistanceSlot
        label="Coordenada X"
        fixedUnits
        valueInMeters={document.coordinates?.x_coord}
      />
      <DistanceSlot
        label="Coordenada Y"
        fixedUnits
        valueInMeters={document.coordinates?.y_coord}
      />
      <DistanceSlot
        label="Coordenada Z"
        fixedUnits
        valueInMeters={document.coordinates?.z_coord}
      />
      {
        document.location_confirmed && (
          <div className="flex flex-col gap-2 border-green-500 border p-2 rounded-md">
            <p className='font-medium text-foreground flex items-center gap-2'>Localización verificada <FaCheckCircle className='text-green-500' /></p>
            <MultiDateSlot
              label="Fecha de verificación"
              values={[document.location_confirmed.date]}
            />
            <TextSlot
              label="Autor de verificación"
              value={document.location_confirmed.author}
            />
          </div>
        )
      }
      <Divider />
      <TextSlot
        label="Municipio"
        value={document.municipality}
      />
      <TextSlot
        label="Localidad"
        value={document.locality}
      />
      <MultiTextSlot
        label="Toponimia"
        values={document.toponymy}
      />
      <TextSlot
        label="Macizo"
        value={document.massif}
      />
      <Divider />
      <TextSlot
        label="Descipción del acceso"
        value={document.location_description}
      />
    </BasicCard>
  )
}
