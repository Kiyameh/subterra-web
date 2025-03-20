'use client'
import React from 'react'

import {ColumnDef} from '@tanstack/react-table'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import {DataTable} from '@/components/Atoms/data-table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/Atoms/avatar'
import {Button} from '@/components/Atoms/button'

import {AdminBadge, EditorBadge} from '@/components/Molecules/slots/user-slots'

import {FaUserEdit} from 'react-icons/fa'
import {RiArrowUpDoubleLine} from 'react-icons/ri'
import {IoClose, IoPersonAdd} from 'react-icons/io5'
import {MdOutlineAdminPanelSettings} from 'react-icons/md'

import CardTitle from '@/components/Molecules/boxes/card-title'
import PromoteCoordinatorDialog from '@/components/Templates/instances/instance-dialogs/promote-coordinator-dialog'
import RemoveEditorDialog from '@/components/Templates/instances/instance-dialogs/remove-editor-dialog'
import LinkBadge from '@/components/Molecules/badges/link-badge'
import PromoteEditorDialog from '@/components/Templates/instances/instance-dialogs/promote-editor-dialog'

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
  const [removeEditorOpen, setRemoveEditorOpen] = React.useState(false)
  const [promoteEditorOpen, setPromoteEditorOpen] = React.useState(false)
  const [promoteCoordinatorOpen, setPromoteCoordinatorOpen] =
    React.useState(false)

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
                  setPromoteCoordinatorOpen(true)
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
                  setRemoveEditorOpen(true)
                }}
              >
                <IoClose />
                Eliminar editor
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
      {adminActions && (
        <Button
          variant="secondary"
          className="w-fit"
          onClick={() => setPromoteEditorOpen(true)}
        >
          <IoPersonAdd />
          Añadir nuevo editor
        </Button>
      )}
      <PromoteCoordinatorDialog
        isOpen={promoteCoordinatorOpen}
        instanceId={instanceId}
        userId={selectedEditor}
        onOpenChange={setPromoteCoordinatorOpen}
      />
      <RemoveEditorDialog
        isOpen={removeEditorOpen}
        instanceId={instanceId}
        userId={selectedEditor}
        onOpenChange={setRemoveEditorOpen}
      />
      <PromoteEditorDialog
        isOpen={promoteEditorOpen}
        instanceId={instanceId}
        onOpenChange={setPromoteEditorOpen}
      />
    </BasicCard>
  )
}
