import React from 'react'
import {auth} from '@/auth'
import {checkIsEditor} from '@/database/services/instance.actions'
import EditDocumentBanner from '@/components/_document-pages/document-notification-area/edit-document-banner'

/**
 * @version 1
 * @description Área de notificación para documentos cave, system  y exploration
 * @param instanceName Nombre de la instancia
 * @param type Tipo de documento
 */

export default async function DocumentNotificationArea({
  instanceName,
  type,
}: {
  instanceName: string
  type: 'cave' | 'exploration' | 'system'
}) {
  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instanceName)

  // Definir etiquetas

  let labels = {
    remove: 'Eliminar cavidad',
    edit: 'Editar cavidad',
  }
  switch (type) {
    case 'exploration':
      labels = {
        remove: 'Eliminar exploración',
        edit: 'Editar exploración',
      }
      break
    case 'system':
      labels = {
        remove: 'Eliminar sistema',
        edit: 'Editar sistema',
      }
      break
  }

  return (
    userId &&
    isEditor && (
      <EditDocumentBanner
        type={type}
        removeLabel={labels.remove}
        editLabel={labels.edit}
        commanderId={userId}
      />
    )
  )
}
