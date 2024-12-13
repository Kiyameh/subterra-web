'use client'
import React from 'react'

import {ColumnDef} from '@tanstack/react-table'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import {DataTable} from '@/components/ui/data-table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {LinkCell} from '@/components/_Atoms/cells/link-cell'

import {AdminBadge, EditorBadge} from '@/components/_Atoms/slots/user-slots'
import PromoteToAdminDialog from '@/components/_Molecules/interactives/promote-to-admin-dialog'
import RemoveMemberDialog from '@/components/_Molecules/interactives/remove-member-dialog'

import {FaUser} from 'react-icons/fa'
import {MdDeleteForever} from 'react-icons/md'
import {MdOutlineUpgrade} from 'react-icons/md'
import {MdOutlineAdminPanelSettings} from 'react-icons/md'
import CardTitle from '@/components/_Atoms/boxes/card-title'

// Interfaz de las filas de la tabla
export interface MembersTableRow {
  _id: string
  name: string
  image: string | undefined
  fullname: string | undefined
  email: string
  isAdmin: boolean
}

/**
 * @version 1
 * @description Tabla de miembros de un grupo
 * @param groupId id del grupo
 * @param rows filas segun la interfaz MembersTableRow
 * @param adminActions Si se muestran las acciones de administrador
 */

export default function MembersTable({
  groupId,
  rows,
  adminActions = false,
}: {
  groupId: string
  rows: MembersTableRow[]
  adminActions?: boolean
}) {
  const [selectedMember, setSelectedMember] = React.useState<string | null>(
    null
  )
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false)
  const [promoteDialogOpen, setPromoteDialogOpen] = React.useState(false)

  // Definición de las columnas de la tabla
  const columns: ColumnDef<MembersTableRow>[] = [
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
        <LinkCell
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
                <MdOutlineUpgrade />
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
                <MdDeleteForever />
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
      <PromoteToAdminDialog
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
