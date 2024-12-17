'use client'
import React from 'react'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {DataTable} from '@/components/ui/data-table'
import {CaveIndex} from '@/database/models/Cave.model'
import {ColumnDef} from '@tanstack/react-table'
import {FaRegCircle} from 'react-icons/fa6'
import {Button} from '@/components/ui/button'
import {TbEditCircle} from 'react-icons/tb'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import Link from 'next/link'
import BooleanBadge from '@/components/_Atoms/badges/boolean-badge'
import RefBadge from '@/components/_Atoms/badges/ref-badge'
import DistanceBadge from '@/components/_Atoms/badges/distance-badge'

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
      accessorKey: 'system',
      header: 'Pertenece a sistema',
      cell: ({row}) => {
        return (
          <RefBadge
            baseUrl={`/instance/${instanceName}/systems/`}
            value={row.original.system}
            type="system"
          />
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
              href={`/instance/${instanceName}/caves/${row.original._id}`}
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
                href={`/instance/${instanceName}/caves/${row.original._id}/edit`}
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
