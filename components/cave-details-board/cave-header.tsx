import React from 'react'
import {getPlainCave, PlainCave} from '@/database/services/cave.actions'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import {FaRegCircle} from 'react-icons/fa'

/**
 * @version 1
 * @description Caja de titulo para páginas de cueva
 * @param caveId nombre de la cueva
 */

export default async function CaveHeader({caveId}: {caveId: string}) {
  // Obtener la cueva
  const cave = (await getPlainCave(caveId)).content as PlainCave | null

  return (
    <HeaderBox
      text={cave?.name || caveId}
      icon={<FaRegCircle />}
    />
  )
}
