'use client'
import BasicCard from '@/components/containing/basic-card'
import {PopulatedGroup} from '@/database/models/Group.model'
import {ColumnDef} from '@tanstack/react-table'
import React from 'react'
import {DataTable} from '../../ui/data-table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

interface MembersTableRows {
  user: {name: string; image: string | undefined}
  fullname: string | undefined
  email: string
  isAdmin: boolean
  [key: string]:
    | {name: string; _id: string}
    | {name: string; image: string | undefined}
    | boolean
    | string
    | undefined
}

export default function MembersCard({group}: {group: PopulatedGroup}) {
  const groupInstances: string[] = group.instances.map(
    (instance) => instance.name
  )

  const columns: ColumnDef<MembersTableRows>[] = [
    {
      accessorKey: 'user',
      header: 'Usuario',
      cell: ({row}) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={row.original.user.image} />
              <AvatarFallback>
                {row.original.user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{row.original.user.name}</span>
          </div>
        )
      },
    },
    {accessorKey: 'fullname', header: 'Nombre completo'},
    {accessorKey: 'email', header: 'Correo'},
    {
      accessorKey: 'isAdmin',
      header: 'Administrador',
      cell: ({row}) => (row.original.isAdmin ? 'Sí' : 'No'),
    },
  ]
  const instanceColumns = groupInstances.map((instance) => ({
    accessorKey: instance,
    header: instance,
  }))

  columns.push(...instanceColumns)

  const rows: MembersTableRows[] = group.members.map((member) => ({
    user: {name: member.name, image: member.image},
    fullname: member.fullname,
    email: member.email,
    isAdmin: group.admin.toString() === member._id,
  }))

  return (
    <BasicCard
      className="w-full"
      cardHeader={<h2 className="text-xl">Miembros del grupo</h2>}
    >
      <DataTable
        columns={columns}
        data={rows}
      />
    </BasicCard>
  )
}
