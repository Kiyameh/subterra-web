import React from 'react'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneInstance} from '@/database/services/instance.services'
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
    .content as PopulatedInstance | null

  return (
    <HeaderBox
      text={instance?.fullname || instanceName}
      icon={<FiBox />}
    />
  )
}
