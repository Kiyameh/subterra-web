import React from 'react'
import {
  getOneInstance,
  InstanceWithUsers,
} from '@/database/services/Instance/getOneInstance'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

import {IoMdMap} from 'react-icons/io'

/**
 * @version 1
 * @description Muestra el territorio de una instancia
 * @param instanceName Nombre de la instancia
 */
export default async function TerritoryCard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as InstanceWithUsers | null

  return (
    <BasicCard
      key="territory_card"
      cardHeader={
        <CardTitle
          title={'Extensión territorial'}
          icon={<IoMdMap />}
        />
      }
      defaultWidth="xl"
    >
      {!instance ? (
        <FetchingErrorButton />
      ) : (
        <div className="flex justify-center items-center">
          <iframe
            src={instance?.map_image}
            width="820"
            height="480"
          />
        </div>
      )}
    </BasicCard>
  )
}
