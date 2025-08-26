'use client'
import React from 'react'
import {type Session} from 'next-auth'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Atoms/dialog'

import ContactForm from './contact-form'
import {MessageCircle} from 'lucide-react'

/**
 * @version 1
 *
 */

export default function FloatingContactDialog({
  isOpen,
  onOpenChange,
  commander,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  commander?: Session['user'] | undefined
}) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-card w-[460px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <MessageCircle />
            Habla con Subterra
          </DialogTitle>
        </DialogHeader>
        <ContactForm commander={commander} />
      </DialogContent>
    </Dialog>
  )
}
