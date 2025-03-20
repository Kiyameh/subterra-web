'use client'
import React from 'react'

import {ColumnDef} from '@tanstack/react-table'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import {DataTable} from '@/components/Atoms/data-table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/Atoms/avatar'
import {Button} from '@/components/Atoms/button'

import {AdminBadge, EditorBadge} from '@/components/Molecules/slots/user-slots'
import PromoteAdminDialog from '@/components/Templates/groups/group-dialogs/promote-admin-dialog'
import RemoveMemberDialog from '@/components/Templates/groups/group-dialogs/remove-member-dialog'

import {FaUser} from 'react-icons/fa'
import {RiArrowUpDoubleLine} from 'react-icons/ri'
import {MdOutlineAdminPanelSettings} from 'react-icons/md'
import {IoClose} from 'react-icons/io5'

import CardTitle from '@/components/Molecules/boxes/card-title'
import LinkBadge from '@/components/Molecules/badges/link-badge'

// Interfaz de las filas de la tabla
export interface GroupMembersTableRow {
  _id: string
  name: string
  image: string | undefined
  fullname: string | undefined
  email: string | undefined
  isAdmin: boolean
}

/**
 * @version 1
 * @description Tabla de miembros de un grupo
 * @param groupId id del grupo
 * @param rows filas segun la interfaz GroupMembersTableRow
 * @param adminActions Si se muestran las acciones de administrador
 */

export default function GroupMembersTable({
  groupId,
  rows,
  adminActions = false,
}: {
  groupId: string
  rows: GroupMembersTableRow[]
  adminActions?: boolean
}) {
  const [selectedMember, setSelectedMember] = React.useState<string | null>(
    null
  )
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false)
  const [promoteDialogOpen, setPromoteDialogOpen] = React.useState(false)

  // Definición de las columnas de la tabla
  const columns: ColumnDef<GroupMembersTableRow>[] = [
    {
      accessorKey: 'user',
      header: 'Usuario',
      cell: ({row}) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={row.original.image} />
              <AvatarFallback>
                {row.original.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{row.original.name}</span>
          </div>
        )
      },
    },
    {accessorKey: 'fullname', header: 'Nombre completo'},
    {
      accessorKey: 'email',
      header: 'Correo',
      cell: ({row}) => (
        <LinkBadge
          value={row.original.email}
          type="email"
        />
      ),
    },
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
    {
      accessorKey: 'actions',
      header: () =>
        adminActions ? (
          <div className="flex flex-row gap-2 items-center">
            <MdOutlineAdminPanelSettings className="text-admin text-lg" />
            Acciones de administrador
          </div>
        ) : (
          ' '
        ),
      cell: ({row}) => {
        return (
          adminActions &&
          !row.original.isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="admin"
                size="sm"
                onClick={() => {
                  setSelectedMember(row.original._id)
                  setPromoteDialogOpen(true)
                }}
              >
                <RiArrowUpDoubleLine />
                Promocionar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSelectedMember(row.original._id)
                  setRemoveDialogOpen(true)
                }}
              >
                <IoClose />
                Eliminar miembro
              </Button>
            </div>
          )
        )
      },
    },
  ]

  return (
    <BasicCard
      className="w-full"
      cardHeader={
        <CardTitle
          title="Miembros del grupo"
          icon={<FaUser />}
        />
      }
    >
      <DataTable
        columns={columns}
        data={rows}
      />
      <PromoteAdminDialog
        isOpen={promoteDialogOpen}
        groupId={groupId}
        userId={selectedMember}
        onOpenChange={setPromoteDialogOpen}
      />

      <RemoveMemberDialog
        isOpen={removeDialogOpen}
        groupId={groupId}
        userId={selectedMember}
        onOpenChange={setRemoveDialogOpen}
      />
    </BasicCard>
  )
}
