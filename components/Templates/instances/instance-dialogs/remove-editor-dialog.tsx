'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

import {type Answer} from '@/database/types/Answer'
import {removeEditor} from '@/database/services/Instance/membership/removeEditor'

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
import {FaUserTimes} from 'react-icons/fa'
import {IoIosWarning} from 'react-icons/io'

/**
 * @version 1
 * @description Diálogo para eliminar un editor de una instancia
 * @param instanceId  Id de la instancia al que se envía la solicitud
 * @param userId  Id del usuario a eliminar
 * @param isOpen  Estado de apertura del diálogo
 * @param onOpenChange  Función para cambiar el estado de apertura del diálogo
 */

export default function RemoveEditorDialog({
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
      const answer = await removeEditor(instanceId, userId)
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
            Eliminar editor
          </DialogTitle>
        </DialogHeader>
        <InfoBox
          title="¿Estás seguro?"
          color="destructive"
          icon={<IoIosWarning />}
        >
          El usuario perdera todos los permisos de edición en esta instancia.
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
