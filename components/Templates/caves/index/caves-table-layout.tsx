'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Atoms/table'
import React from 'react'
import {Button} from '@/components/Atoms/button'
import BooleanBadge from '@/components/Molecules/badges/boolean-badge'
import DistanceBadge from '@/components/Molecules/badges/distance-badge'
import RefBadge from '@/components/Molecules/badges/ref-badge'
import {DataTableColumnHeader} from '@/components/Atoms/data-table-column-header'
import {CaveIndex} from '@/database/services/Cave/getCaveIndex'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import {TbEditCircle} from 'react-icons/tb'
import Link from 'next/link'
import {Input} from '@/components/Atoms/input'
import CollapsibleBox from '@/components/Molecules/boxes/collapsible-box'
import {IoFilter} from 'react-icons/io5'

interface DataTableProps<CaveIndex> {
  instanceName: string
  data: CaveIndex[]
  isEditor: boolean
}

export function CavesTableLayout({
  instanceName,
  data,
  isEditor,
}: DataTableProps<CaveIndex>) {
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
      filterFn: (row, id, value) => {
        // Función de filtrado personalizada para array de strings:
        const initials = row.getValue(id) as string[]
        for (let i = 0; i < initials.length; i++) {
          if (initials[i].toLowerCase().includes(value.toLowerCase())) {
            return true
          }
        }
        return false
      },
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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    // Datos
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Paginación
    getPaginationRowModel: getPaginationRowModel(),
    // Ordenación
    getSortedRowModel: getSortedRowModel(),
    // Filtrado
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      sorting: [
        {
          id: 'length',
          desc: true,
        },
      ],
    },
  })

  return (
    <div>
      <CollapsibleBox
        title="Añadir filtro"
        icon={<IoFilter />}
        className="text-sm mb-4"
      >
        <div className="flex items-center flex-wrap gap-2 p-1">
          <Input
            placeholder="Nombre"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-background border-muted-foreground"
          />
          <Input
            placeholder="Siglas"
            value={
              (table.getColumn('initials')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('initials')?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-background border-muted-foreground"
          />
          <Input
            placeholder="Macizo"
            value={
              (table.getColumn('massif')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('massif')?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-background border-muted-foreground"
          />
        </div>
      </CollapsibleBox>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin datos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <p>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
