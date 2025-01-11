'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

import {Answer} from '@/database/types/answer.type'

import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
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
import {FaUserLock} from 'react-icons/fa6'
import {promoteCoordinator} from '@/database/services/instance.actions'

/**
 * @version 1
 * @description Diálogo para promoción de un editor como coordinador de una instancia
 * @param instanceId  Id de la instancia al que se envía la solicitud
 * @param userId  Id del usuario a promocionar
 * @param isOpen  Estado de apertura del diálogo
 * @param onOpenChange  Función para cambiar el estado de apertura del diálogo
 */

export default function PromoteToCoordinatorDialog({
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
      const answer = await promoteCoordinator(instanceId, userId)
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
            <FaUserLock />
            Promocionar como coordinador
          </DialogTitle>
        </DialogHeader>
        <CollapsibleBox
          title="¿Estás seguro?"
          color="destructive"
        >
          Solo puede haber un coordinador de instancia, esta acción te
          reemplazará como coordinador de la instancia y le dará a este usuario
          todos tus permisos.
        </CollapsibleBox>
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
