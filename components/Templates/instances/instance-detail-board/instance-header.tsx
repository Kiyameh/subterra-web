import React from 'react'

import {getOneInstance} from '@/database/services/Instance/getOneInstance'
import {type InstanceWithUsers} from '@/database/services/Instance/getOneInstance'

import HeaderBox from '@/components/Molecules/boxes/header-box'

import {FiBox} from 'react-icons/fi'

/**
 * @version 1
 * @description Caja de titulo para páginas de instancia
 * @param instanceName nombre de la instancia
 */

export default async function InstanceHeader({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as InstanceWithUsers | null

  return (
    <HeaderBox
      text={instance?.fullname || instanceName}
      icon={<FiBox />}
    />
  )
}
