import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'
import {TextSlot} from '../../../_Atoms/slots/text-slots'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {BsCardText} from 'react-icons/bs'
import {getOneGroup} from '@/database/services/group.services'
import {PopulatedGroup} from '@/database/models/Group.model'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

export default async function GroupDescriptionCard({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  return (
    <BasicCard
      key="description_card"
      cardHeader={
        <CardTitle
          title="Mensaje público"
          icon={<BsCardText />}
        />
      }
    >
      {!group ? (
        <FetchingErrorButton />
      ) : (
        <TextSlot
          textArea
          label="Descripción general"
          value={group.description}
        />
      )}
    </BasicCard>
  )
}
