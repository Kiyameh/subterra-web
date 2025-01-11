'use client'
import React from 'react'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {DataTable} from '@/components/ui/data-table'
import {ColumnDef} from '@tanstack/react-table'
import {FaRegCircle} from 'react-icons/fa6'
import {Button} from '@/components/ui/button'
import {TbEditCircle} from 'react-icons/tb'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import Link from 'next/link'
import BooleanBadge from '@/components/_Atoms/badges/boolean-badge'
import RefBadge from '@/components/_Atoms/badges/ref-badge'
import DistanceBadge from '@/components/_Atoms/badges/distance-badge'
import {DataTableColumnHeader} from '@/components/ui/data-table-column-header'
import {CaveIndex} from '@/database/services/cave.actions'

/**
 * @version 1
 * @description Muestra una tabla con todas las cavidades de una instancia
 * @param cavesIndex Índice de cavidades
 * @param instanceName Nombre de la instancia
 * @param isEditor Si el usuario es editor
 */

export default function AllCavesTable({
  cavesIndex,
  instanceName,
  isEditor,
}: {
  cavesIndex: CaveIndex[]
  instanceName: string
  isEditor: boolean
}) {
  const columns: ColumnDef<CaveIndex>[] = [
    {
      accessorKey: 'name',
      header: ({column}) => (
        <DataTableColumnHeader
          column={column}
          title="Nombre"
        />
      ),
    },
    {
      accessorKey: 'catalog',
      header: ({column}) => (
        <DataTableColumnHeader
          column={column}
          title="Catálogo"
        />
      ),
    },
    {
      accessorKey: 'initials',
      header: ({column}) => (
        <DataTableColumnHeader
          column={column}
          title="Siglas"
        />
      ),
    },
    {
      accessorKey: 'system',
      header: ({column}) => (
        <DataTableColumnHeader
          column={column}
          title="Sistema kárstico"
        />
      ),
      cell: ({row}) => {
        return (
          <RefBadge
            baseUrl={`/instance/${instanceName}/systems/`}
            value={row.original.system as {name: string; _id: string}}
            type="system"
          />
        )
      },
    },
    {
      accessorKey: 'length',
      header: ({column}) => (
        <DataTableColumnHeader
          column={column}
          title="Desarrollo"
        />
      ),
      cell: ({row}) => {
        return <DistanceBadge valueInMeters={row.original.length} />
      },
    },
    {
      accessorKey: 'depth',
      header: ({column}) => (
        <DataTableColumnHeader
          column={column}
          title="Profundidad"
        />
      ),
      cell: ({row}) => {
        return <DistanceBadge valueInMeters={row.original.depth} />
      },
    },
    {
      accessorKey: 'regulations',
      header: ({column}) => (
        <DataTableColumnHeader
          column={column}
          title="Regulaciones"
        />
      ),
      cell: ({row}) => {
        return (
          <BooleanBadge
            invertedColor
            value={row.original.regulations}
          />
        )
      },
    },

    {
      accessorKey: 'massif',
      header: ({column}) => (
        <DataTableColumnHeader
          column={column}
          title="Macizo"
        />
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({row}) => {
        return (
          <div className="flex gap-2">
            <Link
              href={`/instance/${instanceName}/caves/${row.original._id}`}
              replace
            >
              <Button
                variant="secondary"
                size="sm"
              >
                <FaMagnifyingGlass />
                Ver detalles
              </Button>
            </Link>

            {isEditor && (
              <Link
                href={`/instance/${instanceName}/caves/${row.original._id}/edit`}
                replace
              >
                <Button
                  variant="editor"
                  size="sm"
                >
                  <TbEditCircle />
                  Editar
                </Button>
              </Link>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <BasicCard
      className="w-full"
      cardHeader={
        <CardTitle
          title={`Cavidades de ${instanceName}`}
          icon={<FaRegCircle />}
        />
      }
    >
      <DataTable
        columns={columns}
        data={cavesIndex}
      />
    </BasicCard>
  )
}
