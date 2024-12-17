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
      accessorKey: 'catalog',
      header: 'Catálogo',
    },
    {
      accessorKey: 'initials',
      header: 'Siglas exploración',
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
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
                baseUrl={`/instance/${instanceName}/detail/cave/`}
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
      header: 'Desarrollo',
      cell: ({row}) => {
        return <DistanceBadge valueInMeters={row.original.length} />
      },
    },
    {
      accessorKey: 'depth',
      header: 'Profundidad',
      cell: ({row}) => {
        return <DistanceBadge valueInMeters={row.original.depth} />
      },
    },
    {
      accessorKey: 'regulations',
      header: 'Regulaciones',
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
      header: 'Macizo',
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({row}) => {
        return (
          <div className="flex gap-2">
            <Link
              href={`/intance/${instanceName}/detail/system/${row.original._id}`}
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
                href={`/intance/${instanceName}/edit/system/${row.original._id}`}
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
          title={`Systemas de ${instanceName}`}
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
