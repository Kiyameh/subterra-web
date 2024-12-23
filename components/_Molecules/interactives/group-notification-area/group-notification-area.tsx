import React from 'react'
import MembershipRequestBanner from './membership-request-banner'
import {PopulatedGroup} from '@/database/models/Group.model'
import {checkIsMember, getOneGroup} from '@/database/services/group.services'
import {auth} from '@/auth'

export default async function GroupNotificationArea({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isMember = (await checkIsMember(groupName, userId)).ok as boolean

  // Verificar si el usurio tiene petición pendiente
  const hasPendingRequest: boolean | undefined = group?.member_requests.some(
    (request) => request.user._id.toString() === userId
  )

  return (
    !isMember &&
    group && (
      <MembershipRequestBanner
        groupId={group._id}
        userId={userId}
        hasPendingRequest={hasPendingRequest}
      />
    )
  )
}
