'use client'
import React from 'react'
import FloatingContactButton from './floating-contact-button'
import FloatingContactDialog from './floating-contact-dialog'
import {Session} from 'next-auth'

export default function FloatingContactForm({
  commander,
}: {
  commander?: Session['user'] | undefined
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <>
      <FloatingContactButton onClick={() => setDialogOpen(true)} />
      <FloatingContactDialog
        commander={commander}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
