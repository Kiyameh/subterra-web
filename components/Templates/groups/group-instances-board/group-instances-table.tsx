'use client'
import React from 'react'
import {type ColumnDef} from '@tanstack/react-table'

import {DataTable} from '@/components/Atoms/data-table'
import {Badge} from '@/components/Atoms/badge'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import LinkBadge from '@/components/Molecules/badges/link-badge'

import {FiBox} from 'react-icons/fi'

// Interfaz de las filas de la tabla
export interface GroupInstancesTableRow {
  _id: string
  name: string
  fullname: string | undefined
  territory: string | undefined
  coordinators: string[]
  editors: string[]
}

/**
 * @version 1
 * @description Tabla de instancias de un grupo
 * @param rows filas segun la interfaz GroupInstancesTableRow
 */

export default function GroupInstancesTable({
  rows,
}: {
  rows: GroupInstancesTableRow[]
}) {
  // Definición de las columnas de la tabla
  const columns: ColumnDef<GroupInstancesTableRow>[] = [
    {
      accessorKey: 'fullname',
      header: 'Instancia',
      cell: ({row}) => (
        <LinkBadge
          showText={row.original.fullname}
          type="internal"
          value={`/instance/${row.original.name}`}
        />
      ),
    },
    {accessorKey: 'territory', header: 'Territorio'},
    {
      accessorKey: 'coordinator',
      header: 'Coordinador',
      cell: ({row}) => (
        <div className="flex gap-2">
          {row.original.coordinators.map((coordinator) => (
            <Badge
              variant="secondary"
              key={coordinator}
            >
              {coordinator}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'editors',
      header: 'Editores',
      cell: ({row}) => (
        <div className="flex gap-2">
          {row.original.editors.map((editor) => (
            <Badge
              variant="secondary"
              key={editor}
            >
              {editor}
            </Badge>
          ))}
        </div>
      ),
    },
  ]

  return (
    <BasicCard
      className="w-full"
      cardHeader={
        <CardTitle
          title="Instancias del grupo"
          icon={<FiBox />}
        />
      }
    >
      <DataTable
        columns={columns}
        data={rows}
      />
    </BasicCard>
  )
}
