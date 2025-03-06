import React from 'react'

import {getPlainCave, PlainCave} from '@/database/services/cave.actions'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import Divider from '@/components/_Atoms/boxes/divider'
import {MultiTextSlot} from '@/components/_Atoms/slots/text-slots'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {ChipSlot} from '@/components/_Atoms/slots/chip-slots'
import {DistanceSlot} from '@/components/_Atoms/slots/number-slots'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

import {FaMapLocationDot} from 'react-icons/fa6'

/**
 * @version 1
 * @description Muestra la localización de una cavidad
 * @param caveId Id de la cavidad
 */

export default async function CaveLocationCard({caveId}: {caveId: string}) {
  // Obtener la cavidad
  const cave = (await getPlainCave(caveId)).content as PlainCave | null

  return (
    <BasicCard
      key="cave_location_card"
      cardHeader={
        <CardTitle
          title={'Información de localización'}
          icon={<FaMapLocationDot />}
        />
      }
    >
      {!cave ? (
        <FetchingErrorButton />
      ) : (
        <>
          <Divider text="Coordenadas" />
          <ChipSlot
            label="Datum"
            value={cave.coordinates?.coord_proyec}
          />
          <ChipSlot
            label="Formato"
            value={cave.coordinates?.coord_format}
          />
          <ChipSlot
            label="Zona UTM"
            value={cave.coordinates?.utm_zone}
          />
          <DistanceSlot
            label="Coordenada X"
            fixedUnits
            valueInMeters={cave.coordinates?.x_coord}
          />
          <DistanceSlot
            label="Coordenada Y"
            fixedUnits
            valueInMeters={cave.coordinates?.y_coord}
          />
          <DistanceSlot
            label="Coordenada Z"
            fixedUnits
            valueInMeters={cave.coordinates?.z_coord}
          />
          <Divider />
          <TextSlot
            label="Municipio"
            value={cave.municipality}
          />
          <TextSlot
            label="Localidad"
            value={cave.locality}
          />
          <MultiTextSlot
            label="Toponimia"
            values={cave.toponymy}
          />
          <TextSlot
            label="Macizo"
            value={cave.massif}
          />
          <Divider />
          <TextSlot
            label="Descipción del acceso"
            value={cave.location_description}
          />
        </>
      )}
    </BasicCard>
  )
}
