import React from 'react'
import {getPlainCave, PlainCave} from '@/database/services/cave.actions'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import {FaRegCircle} from 'react-icons/fa'
import CaveToolBar from '../_toolbars/cave-toolbar'
import {auth} from '@/auth'
import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'
import MainPictureCard from '../_shared-cards/main-picture-card'

/**
 * @version 2
 * @description Caja de titulo para páginas de cueva
 * @param caveId nombre de la cueva
 * @param instanceName nombre de la instancia
 */

export default async function CaveHeader({
  caveId,
  instanceName,
}: {
  caveId: string
  instanceName: string
}) {
  // Obtener la cueva
  const cave = (await getPlainCave(caveId)).content as PlainCave | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instanceName)

  return (
    <div className="w-full">
      {cave?.pictures?.[0] && (
        <MainPictureCard
          src={cave?.pictures?.[0].file_src ?? null}
          alt={cave?.pictures?.[0].description}
        />
      )}
      <HeaderBox
        text={cave?.name || caveId}
        icon={<FaRegCircle />}
      />
      <CaveToolBar
        isEditor={isEditor}
        commanderId={userId}
      />
    </div>
  )
}
