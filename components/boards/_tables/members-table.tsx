'use client'
import React from 'react'
import BasicCard from '@/components/containing/basic-card'
import {ColumnDef} from '@tanstack/react-table'
import {DataTable} from '../../ui/data-table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {AdminBadge, EditorBadge} from '../_slots/user-slots'

// Interfaz de las filas de la tabla
export interface MembersTableRows {
  user: {name: string; image: string | undefined}
  fullname: string | undefined
  email: string
  isAdmin: boolean
}

// Definición de las columnas de la tabla
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
    header: 'Roles',
    cell: ({row}) =>
      row.original.isAdmin ? (
        <AdminBadge helperText="Administrador del grupo" />
      ) : (
        <EditorBadge
          label="Miembro"
          helperText="Miembro del grupo"
        />
      ),
  },
]

/**
 * @description
 * @param rows filas segun la interfaz MembersTableRows
 */
export default function MembersTable({rows}: {rows: MembersTableRows[]}) {
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
