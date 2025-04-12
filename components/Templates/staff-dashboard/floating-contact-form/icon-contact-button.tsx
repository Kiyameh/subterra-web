'use client'
import React from 'react'
import {useSession} from 'next-auth/react'

import {Button} from '@/components/Atoms/button'
import FloatingContactDialog from './floating-contact-dialog'

import {MessageCircle} from 'lucide-react'

/**
 * @version 2
 * @description Botón de icono para el formulario de contacto
 */

export default function IconContactButton() {
  const {data: session} = useSession()
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setDialogOpen(true)}
      >
        <MessageCircle className="scale-125" />
        <span className="sr-only">Abrir menú contacto</span>
      </Button>
      <FloatingContactDialog
        commander={session?.user}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
