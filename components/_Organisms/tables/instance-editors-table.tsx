'use client'
import React from 'react'

import {ColumnDef} from '@tanstack/react-table'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import {DataTable} from '@/components/ui/data-table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'

import {AdminBadge, EditorBadge} from '@/components/_Atoms/slots/user-slots'

import {FaUserEdit} from 'react-icons/fa'
import {RiArrowUpDoubleLine} from 'react-icons/ri'
import {IoMdClose} from 'react-icons/io'
import {MdOutlineAdminPanelSettings} from 'react-icons/md'

import CardTitle from '@/components/_Atoms/boxes/card-title'
import PromoteToCoordinatorDialog from '@/components/_Molecules/interactives/promote-to-coordinator-dialog'
import RemoveEditorDialog from '@/components/_Molecules/interactives/remove-editor-dialog'
import LinkBadge from '@/components/_Atoms/badges/link-badge'

// Interfaz de las filas de la tabla
export interface InstanceEditorsTableRow {
  _id: string
  name: string
  image: string | undefined
  fullname: string | undefined
  email: string | undefined
  isCoordinator: boolean
}

/**
 * @version 1
 * @description Tabla de editores de una instancia
 * @param instanceId id del grupo
 * @param rows filas segun la interfaz InstanceEditorsTableRow
 * @param adminActions Si se muestran las acciones del coordinador
 */

export default function InstanceEditorsTable({
  instanceId,
  rows,
  adminActions = false,
}: {
  instanceId: string
  rows: InstanceEditorsTableRow[]
  adminActions?: boolean
}) {
  const [selectedEditor, setSelectedEditor] = React.useState<string | null>(
    null
  )
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false)
  const [promoteDialogOpen, setPromoteDialogOpen] = React.useState(false)

  // Definición de las columnas de la tabla
  const columns: ColumnDef<InstanceEditorsTableRow>[] = [
    {
      accessorKey: 'user',
      header: 'Editor',
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
      accessorKey: 'isCoordinator',
      header: 'Roles',
      cell: ({row}) =>
        row.original.isCoordinator ? (
          <AdminBadge
            helperText="Coordinador de la instancia"
            label="Coordinador"
          />
        ) : (
          <EditorBadge helperText="Editor de la instancia" />
        ),
    },
    {
      accessorKey: 'actions',
      header: () =>
        adminActions ? (
          <div className="flex flex-row gap-2 items-center">
            <MdOutlineAdminPanelSettings className="text-admin text-lg" />
            Acciones de coordinador
          </div>
        ) : (
          ' '
        ),
      cell: ({row}) => {
        return (
          adminActions &&
          !row.original.isCoordinator && (
            <div className="flex gap-2">
              <Button
                variant="admin"
                size="sm"
                onClick={() => {
                  setSelectedEditor(row.original._id)
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
                  setSelectedEditor(row.original._id)
                  setRemoveDialogOpen(true)
                }}
              >
                <IoMdClose />
                Retirar permisos
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
          title="Editores de la instancia"
          icon={<FaUserEdit />}
        />
      }
    >
      <DataTable
        columns={columns}
        data={rows}
      />
      <PromoteToCoordinatorDialog
        isOpen={promoteDialogOpen}
        instanceId={instanceId}
        userId={selectedEditor}
        onOpenChange={setPromoteDialogOpen}
      />
      <RemoveEditorDialog
        isOpen={removeDialogOpen}
        instanceId={instanceId}
        userId={selectedEditor}
        onOpenChange={setRemoveDialogOpen}
      />
    </BasicCard>
  )
}
