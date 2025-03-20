'use client'
import React from 'react'
import {useParams, useRouter} from 'next/navigation'

import {Answer} from '@/database/types/Answer'

import {deleteCave} from '@/database/services/Cave/deleteCave'
import {deleteExploration} from '@/database/services/Exploration/deleteExploration'
import {deleteSystem} from '@/database/services/System/deleteSystem'

import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import InfoBox from '@/components/_Atoms/boxes/info-box'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {Loader2} from 'lucide-react'
import {IoIosWarning} from 'react-icons/io'
import {MdDelete} from 'react-icons/md'

/**
 * @version 1
 * @description Diálogo para eliminar un documento de una instancia
 * @param commanderId  ID del documento a eliminar
 * @param isOpen  Estado de apertura del diálogo
 * @param onOpenChange  Función para cambiar el estado de apertura del diálogo
 * @param type  Tipo de documento a eliminar
 *
 */

export default function RemoveDocumentDialog({
  commanderId,
  isOpen,
  onOpenChange,
  type,
}: {
  commanderId: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  type: 'cave' | 'exploration' | 'system'
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const {document} = useParams<{instance: string; document: string}>()

  const handleAccept = () => {
    setDbAnswer(null)
    startTransition(async () => {
      let answer: Answer = {
        ok: false,
        message: 'Error al eliminar el documento',
      }
      switch (type) {
        case 'cave':
          answer = await deleteCave(document, commanderId)
          break
        case 'exploration':
          answer = await deleteExploration(document, commanderId)
          break
        case 'system':
          answer = await deleteSystem(document, commanderId)
          break
      }

      setDbAnswer(answer)

      if (answer.ok) {
        onOpenChange(false)
        router.refresh()
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
            <MdDelete />
            Eliminar documento
          </DialogTitle>
        </DialogHeader>
        <InfoBox
          title="¿Estás seguro?"
          color="destructive"
          icon={<IoIosWarning />}
        >
          Se va a eliminar este documento de forma permanente.
          <span className="text-destructive-foreground">
            Esta acción es irreversible.
          </span>
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
