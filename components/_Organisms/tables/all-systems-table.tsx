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
import {SystemIndex} from '@/database/models/System.model'
import BooleanBadge from '@/components/_Atoms/badges/boolean-badge'
import RefBadge from '@/components/_Atoms/badges/ref-badge'
import DistanceBadge from '@/components/_Atoms/badges/distance-badge'
import {DataTableColumnHeader} from '@/components/ui/data-table-column-header'

export default function AllSystemTable({
  systemIndex,
  instanceName,
  isEditor,
}: {
  systemIndex: SystemIndex[]
  instanceName: string
  isEditor: boolean
}) {
  const columns: ColumnDef<SystemIndex>[] = [
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
      accessorKey: 'caves',
      header: 'Cavidades',
      cell: ({row}) => {
        return (
          <div className="flex flex-row flex-wrap gap-1">
            {row.original.caves?.map((cave) => (
              <RefBadge
                key={cave._id}
                baseUrl={`/instance/${instanceName}/caves/`}
                value={cave}
                type="cave"
              />
            ))}
          </div>
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
              href={`/instance/${instanceName}/systems/${row.original._id}`}
              replace
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  console.log(row.original._id)
                }}
              >
                <FaMagnifyingGlass />
                Ver detalles
              </Button>
            </Link>

            {isEditor && (
              <Link
                href={`/instance/${instanceName}/systems/${row.original._id}/edit`}
                replace
              >
                <Button
                  variant="editor"
                  size="sm"
                  onClick={() => {
                    console.log(row.original._id)
                  }}
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
          title={`Sistemas de ${instanceName}`}
          icon={<FaRegCircle />}
        />
      }
    >
      <DataTable
        columns={columns}
        data={systemIndex}
      />
    </BasicCard>
  )
}
