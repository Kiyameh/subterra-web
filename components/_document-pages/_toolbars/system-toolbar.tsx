'use client'
import React from 'react'
import Link from 'next/link'
import {useParams} from 'next/navigation'

import RemoveDocumentDialog from './remove-document-dialog'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'

import {MdModeEdit} from 'react-icons/md'
import {AiOutlineDelete} from 'react-icons/ai'
import {FaDownload} from 'react-icons/fa6'
import {IoMdPrint} from 'react-icons/io'
import {FaRegStar} from 'react-icons/fa'
import {toast} from 'sonner'

/**
 * @version 1
 * @description Barra de herramientas para sistema
 * @param isEditor Si el usuario es editor
 * @param commanderId Id del editor
 */

export default function SystemToolBar({
  isEditor,
  commanderId,
}: {
  isEditor: boolean
  commanderId: string | null
}) {
  const {document} = useParams()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Menubar className="bg-card w-7xl">
        <MenubarMenu>
          <MenubarTrigger
            className="space-x-1 cursor-pointer"
            onClick={
              () =>
                toast('Funcionalidad en desarrollo', {
                  description: 'Pronto estará disponible',
                })
              // TODO: Implementar funcionalidad
            }
          >
            <FaRegStar />
            <span>Favorito</span>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className="space-x-1 cursor-pointer"
            onClick={
              () =>
                toast('Funcionalidad en desarrollo', {
                  description: 'Pronto estará disponible',
                })
              // TODO: Implementar funcionalidad
            }
          >
            <FaDownload />
            <span>Descargar</span>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className="space-x-1 cursor-pointer"
            onClick={
              () =>
                toast('Funcionalidad en desarrollo', {
                  description: 'Pronto estará disponible',
                })
              // TODO: Implementar funcionalidad
            }
          >
            <IoMdPrint />
            <span>Imprimir</span>
          </MenubarTrigger>
        </MenubarMenu>
        {isEditor && (
          <MenubarMenu>
            <MenubarTrigger className="space-x-1">
              <MdModeEdit className="text-editor" />
              <span>Editar</span>
            </MenubarTrigger>
            <MenubarContent>
              <Link href={`${document}/edit?section=general`}>
                <MenubarItem className="cursor-pointer">
                  Datos generales
                </MenubarItem>
              </Link>
              <Link href={`${document}/edit?section=science`}>
                <MenubarItem className="cursor-pointer">
                  Datos científicos
                </MenubarItem>
              </Link>
              <Link href={`${document}/edit?section=topography`}>
                <MenubarItem className="cursor-pointer">Topografía</MenubarItem>
              </Link>
              <Link href={`${document}/edit?section=pictures`}>
                <MenubarItem className="cursor-pointer">Imagenes</MenubarItem>
              </Link>
              <MenubarSeparator />
              <MenubarItem
                onClick={() => setIsOpen(true)}
                className="text-destructive-foreground cursor-pointer"
              >
                <AiOutlineDelete />
                Eliminar sistema
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        )}
      </Menubar>
      {commanderId && (
        <RemoveDocumentDialog
          commanderId={commanderId}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          type="system"
        />
      )}
    </>
  )
}
