import React from 'react'

import {getOneGroup} from '@/database/services/Group/getOneGroup'
import {type GroupWithUsers} from '@/database/services/Group/getOneGroup'

import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'

import {BsCardText} from 'react-icons/bs'

/**
 * @version 1
 * @description Muestra la descripción de un grupo
 * @param groupName Nombre del grupo
 */

export default async function GroupDescriptionCard({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as GroupWithUsers | null

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
