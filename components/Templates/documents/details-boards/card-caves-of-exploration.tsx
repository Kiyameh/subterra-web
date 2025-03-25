import React from 'react'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import CaveWidget from './widget-cave'

import {MdOutlineExplore} from 'react-icons/md'

/**
 * @version 2
 * @description Muestra las cavidades de una exploración
 * @param caves Array de Ids de cavidades
 */

export default function ExplorationCavesCard({caves}: {caves: string[]}) {
  return (
    <BasicCard
      className="w-full"
      key="explorations_card"
      cardHeader={
        <CardTitle
          title={'Cavidades exploradas'}
          icon={<MdOutlineExplore />}
        />
      }
    >
      {caves.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <span className="text-foreground/60">
            No hay cavidades asociadas a esta exploración
          </span>
        </div>
      ) : (
        caves.map((caveId) => {
          return (
            <CaveWidget
              key={caveId}
              caveId={caveId}
            />
          )
        })
      )}
    </BasicCard>
  )
}
