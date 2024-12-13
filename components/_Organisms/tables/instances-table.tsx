'use client'
import React from 'react'

import {ColumnDef} from '@tanstack/react-table'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import {DataTable} from '@/components/ui/data-table'

import {Badge} from '@/components/ui/badge'
import {FiBox} from 'react-icons/fi'
import {LinkCell} from '@/components/_Atoms/cells/link-cell'

// Interfaz de las filas de la tabla
export interface InstancesTableRow {
  _id: string
  name: string
  fullname: string | undefined
  territory: string | undefined
  coordinator: string
  editors: string[]
}

/**
 * @version 1
 * @description Tabla de instancias de un grupo
 * @param rows filas segun la interfaz InstancesTableRow
 */

export default function InstancesTable({rows}: {rows: InstancesTableRow[]}) {
  // Definición de las columnas de la tabla
  const columns: ColumnDef<InstancesTableRow>[] = [
    {
      accessorKey: 'fullname',
      header: 'Instancia',
      cell: ({row}) => (
        <LinkCell
          label={row.original.fullname}
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
          <Badge
            variant="secondary"
            key={row.original.coordinator}
          >
            {row.original.coordinator}
          </Badge>
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
        <div className="flex flex-row items-center gap-3">
          <FiBox className="text-xl" />
          <h2 className="text-xl">Instancias del grupo</h2>
        </div>
      }
    >
      <DataTable
        columns={columns}
        data={rows}
      />
    </BasicCard>
  )
}
