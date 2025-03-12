import React from 'react'
import {getPlainSystem, PlainSystem} from '@/database/services/system.actions'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import {PiCirclesThreeBold} from 'react-icons/pi'
import {auth} from '@/auth'
import {checkIsEditor} from '@/database/services/instance.actions'
import MainPictureCard from '../_shared-cards/main-picture-card'
import SystemToolBar from '../_toolbars/system-toolbar'

/**
 * @version 2
 * @description Caja de titulo para páginas de sistema
 * @param systemId nombre de sistema
 * @param instanceName nombre de la instancia
 */

export default async function SystemHeader({
  systemId,
  instanceName,
}: {
  systemId: string
  instanceName: string
}) {
  // Obtener sistema
  const system = (await getPlainSystem(systemId)).content as PlainSystem | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instanceName)

  return (
    <div className="w-full">
      {system?.pictures?.[0] && (
        <MainPictureCard
          src={system?.pictures?.[0].file_src ?? null}
          alt={system?.pictures?.[0].description}
        />
      )}
      <HeaderBox
        text={system?.name || systemId}
        icon={<PiCirclesThreeBold />}
      />
      <SystemToolBar
        isEditor={isEditor}
        commanderId={userId}
      />
    </div>
  )
}
