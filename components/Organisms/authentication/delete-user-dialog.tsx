'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'

import {type Answer} from '@/database/types/Answer'
import {deleteUser} from '@/database/services/User/deleteUser'

import {Button} from '@/components/Atoms/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Atoms/dialog'
import InfoBox from '@/components/Molecules/boxes/info-box'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'

import {Loader2} from 'lucide-react'
import {IoIosWarning} from 'react-icons/io'
import {IoClose} from 'react-icons/io5'

/**
 * @version 1
 * @description Diálogo para eliminar el perfil de un usuario
 * @param userEmail  email del usuario a eliminar
 * @param isOpen  Estado de apertura del diálogo
 * @param onOpenChange  Función para cambiar el estado de apertura del diálogo
 */

export default function DeleteUserDialog({
  userEmail,
  isOpen,
  onOpenChange,
}: {
  userEmail: string | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const handleAccept = () => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await deleteUser(userEmail)
      if (answer.ok) {
        setDbAnswer(null)
        onOpenChange(false)
        signOut()
      } else {
        setDbAnswer(answer)
      }
    })
  }

  const handleReject = () => {
    setDbAnswer(null)
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-card w-[460px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <IoClose />
            Eliminar cuenta
          </DialogTitle>
        </DialogHeader>
        <InfoBox
          title="¿Estás seguro?"
          color="destructive"
          icon={<IoIosWarning />}
        >
          Esta acción es irreversible
        </InfoBox>

        <DbAwnserBox answer={dbAnswer} />
        <DialogFooter className="mt-6">
          <Button
            disabled={isPending}
            variant="outline"
            onClick={handleReject}
          >
            {isPending && <Loader2 className="animate-spin" />}
            Rechazar
          </Button>
          <Button
            disabled={isPending}
            onClick={handleAccept}
          >
            {isPending && <Loader2 className="animate-spin" />}
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
