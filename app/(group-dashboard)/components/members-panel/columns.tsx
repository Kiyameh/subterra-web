'use client'

import {ColumnDef} from '@tanstack/react-table'
import {MoreHorizontal} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type MembersInfo = {
  name: string
  email: string
  fullname: string
  isAdmin: boolean
}

export const columns: ColumnDef<MembersInfo>[] = [
  {accessorKey: 'name', header: 'Usuario'},
  {accessorKey: 'email', header: 'Email'},
  {accessorKey: 'fullname', header: 'Nombre completo'},

  {
    accessorKey: 'isAdmin',
    header: 'Administrador',
    cell: ({row}) => <div>{row.original.isAdmin ? 'Si' : 'No'}</div>,
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const member = row.original
      console.log(member)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {}}>Enviar email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Promocionar como editor</DropdownMenuItem>
            <DropdownMenuItem>Promocionar como administrador</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
