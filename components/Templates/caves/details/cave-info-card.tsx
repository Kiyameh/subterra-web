import React from 'react'

import {PopulatedCave} from '@/database/services/Cave/getPopulatedCave'
import {getPopulatedCave} from '@/database/services/Cave/getPopulatedCave'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import {MultiTextSlot} from '@/components/Molecules/slots/text-slots'
import {BooleanSlot} from '@/components/Molecules/slots/chip-slots'
import {MultiChipSlot} from '@/components/Molecules/slots/chip-slots'
import {DistanceSlot} from '@/components/Molecules/slots/number-slots'
import {SystemSlot} from '@/components/Molecules/slots/documents-slots'
import Divider from '@/components/Molecules/boxes/divider'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

import {IoMdInformationCircle} from 'react-icons/io'

/**
 * @version 1
 * @description Muestra la información general de una cavidad
 * @param caveId Id de la cavidad
 */

export default async function CaveInfoCard({caveId}: {caveId: string}) {
  // Obtener la cavidad
  const cave = (await getPopulatedCave(caveId)).content as PopulatedCave | null

  return (
    <BasicCard
      key="cave_info_card"
      cardHeader={
        <CardTitle
          title={'Información general'}
          icon={<IoMdInformationCircle />}
        />
      }
    >
      {!cave ? (
        <FetchingErrorButton />
      ) : (
        <>
          <TextSlot
            label="ID"
            value={cave._id}
          />
          <TextSlot
            label="Catálogo externo"
            value={cave.catalog}
          />
          <MultiTextSlot
            label="Siglas de exploración"
            values={cave.initials}
          />
          <TextSlot
            label="Nombre"
            value={cave.name}
          />
          <MultiTextSlot
            label="Nombres alternativos"
            values={cave.alt_names}
          />

          <MultiChipSlot
            label="Morfología"
            values={cave.cave_shapes}
          />
          <BooleanSlot
            label="Regulaciones"
            value={cave.regulations}
          />
          <TextSlot
            textArea
            label="Descripción de las regulaciones"
            value={cave.regulation_description}
          />
          <DistanceSlot
            label="Longitud"
            valueInMeters={cave.length}
          />
          <DistanceSlot
            label="Profundidad"
            valueInMeters={cave.depth}
          />
          {cave.system && (
            <>
              <Divider text="Pertenece al sistema" />
              <SystemSlot system={cave.system} />
            </>
          )}
        </>
      )}
    </BasicCard>
  )
}
