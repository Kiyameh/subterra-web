import React from 'react'

import {PopulatedCave} from '@/database/services/Cave/getPopulatedCave'
import {getPopulatedCave} from '@/database/services/Cave/getPopulatedCave'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'
import {ExplorationSlot} from '@/components/_Atoms/slots/documents-slots'

import {MdOutlineExplore} from 'react-icons/md'

/**
 * @version 1
 * @description Muestra las exploraciones de una cavidad
 * @param caveId Id de la cavidad
 */
export default async function ExplorationsCards({caveId}: {caveId: string}) {
  // Obtener la cavidad
  const cave = (await getPopulatedCave(caveId)).content as PopulatedCave | null

  if (!cave || !cave?.explorations?.[0]) {
    return null
  }

  return (
    <BasicCard
      key="explorations_card"
      cardHeader={
        <CardTitle
          title={'Últimas exploraciones'}
          icon={<MdOutlineExplore />}
        />
      }
    >
      {!cave ? (
        <FetchingErrorButton />
      ) : (
        <>
          {cave.explorations.reverse().map((exploration) => (
            <ExplorationSlot
              key={exploration._id}
              exploration={exploration}
            />
          ))}
        </>
      )}
    </BasicCard>
  )
}
