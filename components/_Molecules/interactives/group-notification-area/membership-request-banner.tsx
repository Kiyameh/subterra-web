'use client'
import React from 'react'

import {Button} from '@/components/ui/button'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import MembershipRequestDialog from '@/components/_Molecules/interactives/group-notification-area/membership-request-dialog'
import {IoCloseSharp} from 'react-icons/io5'

/**
 * @version 1
 * @description Banner que abre el dialogo para enviar una solicitud de membresía al grupo
 * @param userId Id del usuario que envía la solicitud
 * @param groupId Id del grupo al que se envía la solicitud
 * @param hasPendingRequest Si tiene alguna solicitud pendiente
 */
export default function MembershipRequestBanner({
  groupId,
  userId,
  hasPendingRequest,
}: {
  groupId: string
  userId: string | null
  hasPendingRequest?: boolean
}) {
  const [bannerOpen, setBannerOpen] = React.useState(true)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  if (!bannerOpen) return null

  function chooseAction(
    userId: string | null,
    hasPendingRequest: boolean | undefined
  ) {
    if (userId && hasPendingRequest) {
      return (
        <Button
          className="rounded-full"
          size="sm"
          disabled
        >
          Solicitud enviada
        </Button>
      )
    } else if (userId && !hasPendingRequest) {
      return (
        <Button
          className="rounded-full"
          size="sm"
          onClick={() => setDialogOpen(true)}
        >
          Enviar solicitud
        </Button>
      )
    } else {
      return (
        <LinkButton
          className="max-w-fit rounded-full"
          size="sm"
          label="Inicia sesión"
          href="/auth/login"
        />
      )
    }
  }

  return (
    <>
      <div className="w-full flex items-center justify-between rounded-lg bg-card p-1">
        <div className="flex grow gap-3 items-center md:justify-center">
          <span className="text-sm text-muted-foreground">
            ¿Te gustaría formar parte del grupo?
          </span>
          {chooseAction(userId, hasPendingRequest)}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-transparent"
          aria-label="Cerrar banner"
          onClick={() => setBannerOpen(false)}
        >
          <IoCloseSharp className="opacity-70 transition-opacity hover:opacity-100" />
        </Button>
      </div>
      {userId && (
        <MembershipRequestDialog
          groupId={groupId}
          userId={userId}
          isOpen={dialogOpen}
          setDialogOpen={(open) => setDialogOpen(open)}
        />
      )}
    </>
  )
}
