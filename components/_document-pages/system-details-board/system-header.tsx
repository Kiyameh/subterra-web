import React from 'react'
import {getPlainSystem, PlainSystem} from '@/database/services/system.actions'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import {PiCirclesThreeBold} from 'react-icons/pi'

/**
 * @version 1
 * @description Caja de titulo para páginas de sistema
 * @param systemId nombre de sistema
 */

export default async function SystemHeader({systemId}: {systemId: string}) {
  // Obtener sistema
  const system = (await getPlainSystem(systemId)).content as PlainSystem | null

  return (
    <HeaderBox
      text={system?.name || systemId}
      icon={<PiCirclesThreeBold />}
    />
  )
}
