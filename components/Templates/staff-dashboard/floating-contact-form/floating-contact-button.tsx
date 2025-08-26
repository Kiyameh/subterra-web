'use client'
import React from 'react'
import {type Session} from 'next-auth'

import FloatingContactDialog from './floating-contact-dialog'
import {Button} from '@/components/Atoms/button'
import {MessageCircle} from 'lucide-react'

/**
 * @version 2
 * @description Botón flotante para el formulario de contacto
 * @param commander - Usuario autenticado
 * @returns Botón flotante y formulario de contacto
 */

export default function FloatingContactButton({
  commander,
}: {
  commander?: Session['user'] | undefined
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        className="rounded-full h-10 w-10 flex items-center justify-center"
      >
        <MessageCircle className="scale-150" />
      </Button>
      <FloatingContactDialog
        commander={commander}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
