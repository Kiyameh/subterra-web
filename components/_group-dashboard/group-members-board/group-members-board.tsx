import React from 'react'
import {auth} from '@/auth'
import {checkIsAdmin} from '@/database/services/Group/membership/checkIsAdmin'

import NotFoundCard from '@/components/cards/404-not-found'

import GroupMembersTable, {GroupMembersTableRow} from './group-members-table'
import {
  getOneGroup,
  GroupWithUsers,
} from '@/database/services/Group/getOneGroup'

/**
 * @version 1
 * @description Board de miembros de un grupo
 * @param groupName Nombre del grupo
 */

export default async function GroupMembersBoard({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as GroupWithUsers | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isAdmin = await checkIsAdmin(userId, groupName)

  if (!group) {
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
      />
    )
  }

  // Generar las filas de la tabla

  const rows: GroupMembersTableRow[] = group.members.map((member) => ({
    _id: member._id,
    name: member.name,
    image: member.image,
    fullname: member.fullname,
    email: member.email,
    isAdmin: group.admins
      .map((admin) => admin._id.toString())
      .includes(member._id),
  }))

  return (
    <GroupMembersTable
      groupId={group._id}
      rows={rows}
      adminActions={isAdmin}
    />
  )
}
