import React from 'react'
import {auth} from '@/auth'

import {
  checkIsMember,
  getOneGroup,
  GroupWithUsers,
} from '@/database/services/group.actions'
import MembershipRequestBanner from './membership-request-banner'

export default async function GroupNotificationArea({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as GroupWithUsers

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Verificar si el usurio tiene petición pendiente
  const hasPendingRequest: boolean | undefined = group?.member_requests.some(
    (request) => request.user._id.toString() === userId
  )

  // Validar roles de usuario
  const isMember = await checkIsMember(userId, groupName)

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
