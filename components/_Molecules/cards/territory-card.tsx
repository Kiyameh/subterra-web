import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import React from 'react'
import {IoMdMap} from 'react-icons/io'

export default function TerritoryCard({map_image}: {map_image: string}) {
  return (
    <BasicCard
      cardHeader={
        <CardTitle
          title={'Extensión territorial'}
          icon={<IoMdMap />}
        />
      }
      defaultWidth="xl"
    >
      <div className="flex justify-center items-center">
        <iframe
          src={map_image}
          width="820"
          height="480"
        />
      </div>
    </BasicCard>
  )
}
