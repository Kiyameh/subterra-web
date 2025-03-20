'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

import {demoteCoordinator} from '@/database/services/Instance/membership/demoteCoordinator'
import {Answer} from '@/database/types/Answer'

import InfoBox from '@/components/_Atoms/boxes/info-box'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'

import {Loader2} from 'lucide-react'
import {FaUserTimes} from 'react-icons/fa'
import {IoIosWarning} from 'react-icons/io'

/**
 * @version 1
 * @description Diálogo para renunciar como coordinador de una instancia
 * @param instanceId  Id de la instancia al que se envía la solicitud
 * @param userId  Id del usuario a eliminar
 * @param isOpen  Estado de apertura del diálogo
 * @param onOpenChange  Función para cambiar el estado de apertura del diálogo
 */

export default function ResignCoordinatorDialog({
  userId,
  instanceId,
  isOpen,
  onOpenChange,
}: {
  userId: string | null
  instanceId: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const handleAccept = () => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await demoteCoordinator(instanceId, userId)
      if (answer.ok) {
        setDbAnswer(null)
        onOpenChange(false)
        router.refresh()
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
            <FaUserTimes />
            Renunciar como coordinador
          </DialogTitle>
        </DialogHeader>
        <InfoBox
          title="¿Estás seguro?"
          color="destructive"
          icon={<IoIosWarning />}
        >
          Vas a renunciar como coordinador de esta instancia. Pasaras a ser solo
          editor. No puedes renunciar si eres el único coordinador.
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
