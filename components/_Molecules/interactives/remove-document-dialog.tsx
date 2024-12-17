'use client'
import React from 'react'
import {useParams, useRouter} from 'next/navigation'
import {Answer} from '@/database/types/answer.type'
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
import {IoIosWarning} from 'react-icons/io'
import {MdDelete} from 'react-icons/md'
import {deleteOneCave} from '@/database/services/cave.services'
import {deleteOneExploration} from '@/database/services/exploration.services'
import {deleteOneSystem} from '@/database/services/system.services'

/**
 * @version 1
 * @description Diálogo para eliminar un documento de una instancia
 * @param isOpen  Estado de apertura del diálogo
 * @param onOpenChange  Función para cambiar el estado de apertura del diálogo
 */

export default function RemoveDocumentDialog({
  isOpen,
  onOpenChange,
  type,
}: {
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
          answer = await deleteOneCave(document)
          break
        case 'exploration':
          answer = await deleteOneExploration(document)
          break
        case 'system':
          answer = await deleteOneSystem(document)
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
