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
import {ExplorationIndex} from '@/database/models/Exploration.model'
import DateBadge from '@/components/_Atoms/badges/date-badge'
import RefBadge from '@/components/_Atoms/badges/ref-badge'
import TimeBadge from '@/components/_Atoms/badges/time-badge'

export default function AllExplorationTable({
  explorationsIndex,
  instanceName,
  isEditor,
}: {
  explorationsIndex: ExplorationIndex[]
  instanceName: string
  isEditor: boolean
}) {
  const columns: ColumnDef<ExplorationIndex>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'dates',
      header: 'Fechas',
      cell: ({row}) => {
        return (
          <div className="flex flex-row flex-wrap gap-1">
            {row.original.dates?.map((date, i) => (
              <DateBadge
                key={i}
                value={date}
              />
            ))}
          </div>
        )
      },
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
      accessorKey: 'groups',
      header: 'Grupos',
      cell: ({row}) => {
        return (
          <div className="flex flex-row flex-wrap gap-1">
            {row.original.groups?.map((group) => (
              <RefBadge
                key={group._id}
                baseUrl={`/group/`}
                value={group}
                type="group"
              />
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: 'cave_time',
      header: 'Tiempo en cavidad',
      cell: ({row}) => {
        return <TimeBadge valueInSeconds={row.original.cave_time} />
      },
    },

    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({row}) => {
        return (
          <div className="flex gap-2">
            <Link
              href={`/instance/${instanceName}/detail/exploration/${row.original._id}`}
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
                href={`/instance/${instanceName}/edit/exploration/${row.original._id}`}
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
          title={`Ultimas exploraciones de ${instanceName}`}
          icon={<FaRegCircle />}
        />
      }
    >
      <DataTable
        columns={columns}
        data={explorationsIndex}
      />
    </BasicCard>
  )
}
