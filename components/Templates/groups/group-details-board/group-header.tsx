import React from 'react'
import HeaderBox from '@/components/Molecules/boxes/header-box'
import {
  getOneGroup,
  GroupWithUsers,
} from '@/database/services/Group/getOneGroup'

import {FaUserGroup} from 'react-icons/fa6'

/**
 * @version 1
 * @description Caja de titulo para páginas de grupo
 * @param groupName nombre de la grupo
 */

export default async function GroupHeader({groupName}: {groupName: string}) {
  // Obtener la instancia
  const group = (await getOneGroup(groupName)).content as GroupWithUsers | null

  return (
    <HeaderBox
      text={group?.fullname || groupName}
      icon={<FaUserGroup />}
    />
  )
}
