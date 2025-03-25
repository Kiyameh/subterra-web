import React from 'react'

import {getOneGroup} from '@/database/services/Group/getOneGroup'
import {type GroupWithUsers} from '@/database/services/Group/getOneGroup'

import {TextSlot} from '@/components/Molecules/slots/text-slots'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import {MultiChipSlot} from '@/components/Molecules/slots/chip-slots'
import CardTitle from '@/components/Molecules/boxes/card-title'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

import {IoMdInformationCircle} from 'react-icons/io'

/**
 * @version 1
 * @description Muestra la información de un grupo
 * @param groupName Nombre del grupo
 */

export default async function GroupInfoCard({groupName}: {groupName: string}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as GroupWithUsers | null

  return (
    <BasicCard
      key="group_info_card"
      cardHeader={
        <CardTitle
          title={'Información general'}
          icon={<IoMdInformationCircle />}
        />
      }
    >
      {!group ? (
        <FetchingErrorButton />
      ) : (
        <>
          <TextSlot
            label="ID"
            value={group._id}
          />
          <TextSlot
            label="Ácronimo"
            value={group.acronym}
          />
          <TextSlot
            label="Nombre completo"
            value={group.fullname}
          />
          <TextSlot
            label="Nombre corto"
            value={group.name}
          />
          <MultiChipSlot
            label="Categorias"
            values={group.group_categories}
          />
        </>
      )}
    </BasicCard>
  )
}
