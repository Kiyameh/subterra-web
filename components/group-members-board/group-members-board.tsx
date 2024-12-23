import React from 'react'
import {auth} from '@/auth'

import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import {checkIsAdmin, getOneGroup} from '@/database/services/group.services'
import {PopulatedGroup} from '@/database/models/Group.model'

import GroupMembersTable, {GroupMembersTableRow} from './group-members-table'

export default async function GroupMembersBoard({
  groupName,
}: {
  groupName: string
}) {
  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isAdmin = (await checkIsAdmin(groupName, userId)).ok as boolean

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
    isAdmin: group.admin._id.toString() === member._id,
  }))

  return (
    <GroupMembersTable
      groupId={group._id}
      rows={rows}
      adminActions={isAdmin}
    />
  )
}
