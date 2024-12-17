'use client'
import React from 'react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import RemoveDocumentDialog from './remove-document-dialog'
import {useParams} from 'next/navigation'

/**
 * @version 1
 * @description Banner con las acciones de editor de una instancia
 * @param type  Tipo de documento a editar
 * @param removeLabel  Texto del botón de eliminar
 * @param editLabel  Texto del botón de editar
 */
export default function EditDocumentBanner({
  type,
  removeLabel = 'Eliminar documento',
  editLabel = 'Editar documento',
}: {
  type: 'cave' | 'exploration' | 'system'
  removeLabel?: string
  editLabel?: string
}) {
  const {document} = useParams()
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <div className="w-full flex items-center justify-center rounded-lg bg-card p-1 gap-3">
        <span className="text-sm text-muted-foreground">
          Acciones de editor
        </span>
        <Link href={`${document}/edit`}>
          <Button
            variant="editor"
            size="sm"
          >
            {editLabel}
          </Button>
        </Link>
        <Button
          onClick={() => setIsOpen(true)}
          variant="destructive"
          size="sm"
        >
          {removeLabel}
        </Button>
      </div>
      <RemoveDocumentDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        type={type}
      />
    </>
  )
}
