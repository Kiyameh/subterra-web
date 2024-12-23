import React from 'react'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneGroup} from '@/database/services/group.services'
import {FaUserGroup} from 'react-icons/fa6'

/**
 * @version 1
 * @description Caja de titulo para páginas de grupo
 * @param groupName nombre de la grupo
 */

export default async function GroupHeader({groupName}: {groupName: string}) {
  // Obtener la instancia
  const group = (await getOneGroup(groupName))
    .content as PopulatedInstance | null

  return (
    <HeaderBox
      text={group?.fullname || groupName}
      icon={<FaUserGroup />}
    />
  )
}
