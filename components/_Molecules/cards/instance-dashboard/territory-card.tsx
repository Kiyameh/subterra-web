import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneInstance} from '@/database/services/instance.services'
import React from 'react'
import {IoMdMap} from 'react-icons/io'

export default async function TerritoryCard({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as PopulatedInstance | null

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
