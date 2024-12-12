'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

import {PopulatedGroup} from '@/database/models/Group.model'
import {Answer} from '@/database/types/answer.type'
import {
  acceptMemberRequest,
  rejectMemberRequest,
} from '@/database/services/group.services'

import {ScrollArea} from '@/components/ui/scroll-area'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'

import {Loader2} from 'lucide-react'
import {FaUserCheck} from 'react-icons/fa'

/**
 * @version 1
 * @description Diálogo para aceptar o rechazar una solicitud de acceso al grupo
 * @param groupId <string> Id del grupo al que se envía la solicitud
 * @param request <PopulatedGroup["member_requests"][0]> Solicitud de acceso
 * @param isOpen <boolean> Estado de apertura del diálogo
 * @param onOpenChange <function> Función para cambiar el estado de apertura del diálogo
 *
 */

export default function PendingRequestDialog({
  groupId,
  request,
  isOpen,
  onOpenChange,
}: {
  groupId: string
  request: PopulatedGroup['member_requests'][0]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const handleAccept = () => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await acceptMemberRequest(groupId, request._id)
      setDbAnswer(answer)

      if (answer.ok) {
        onOpenChange(false)
        router.refresh()
      }
    })
  }

  const handleReject = () => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await rejectMemberRequest(groupId, request._id)
      setDbAnswer(answer)

      if (answer.ok) {
        onOpenChange(false)
        router.refresh()
      }
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-card w-[460px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FaUserCheck />
            Solicitudes de acceso
          </DialogTitle>
          <DialogDescription>
            {`Revisa la solicitud de acceso de ${request.user.name}.`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 rounded-md border border-muted-foreground bg-muted p-2">
          <Avatar>
            <AvatarImage
              src={request.user.image}
              alt={request.user.name}
            />
            <AvatarFallback className="bg-primary">
              {request.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-semibold">{request.user.name}</h4>
            <p className="text-sm text-muted-foreground">
              {request.user.email}
            </p>
          </div>
        </div>
        <ScrollArea className="mt-2 max-h-[200px] rounded-md border p-4">
          <h5 className="mb-2 text-sm font-semibold">Mensaje:</h5>
          <p className="text-sm text-muted-foreground">{request.message}</p>
        </ScrollArea>
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
            Acceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
