'use client'
import React from 'react'

import {type GroupWithUsers} from '@/database/services/Group/getOneGroup'

import {Button} from '@/components/Atoms/button'
import PendingRequestDialog from '@/components/Templates/groups/group-dialogs/pending-request-dialog'

import {TiUserAdd} from 'react-icons/ti'
import {IoCloseSharp} from 'react-icons/io5'

/**
 * @version 1
 * @description Banner que muestra las solicitudes pendientes de revisar
 * @param requests Solicitudes pendientes
 * @param groupId Id del grupo al que se envían las solicitudes
 */

export default function PendingRequestBanner({
  requests,
  groupId,
}: {
  requests: GroupWithUsers['member_requests']
  groupId: string
}) {
  const [openDialogId, setOpenDialogId] = React.useState<string | null>(null)
  const [bannerOpen, setBannerOpen] = React.useState(true)

  if (!bannerOpen) return null
  if (requests.length === 0) return null

  return (
    <>
      <div className="w-full flex items-center justify-between rounded-lg bg-card  p-1 text-muted-foreground">
        <div className="flex grow gap-3 items-center md:justify-center">
          <span className="text-sm">
            Hay solicitudes pendientes de revisar:
          </span>
          <div className="flex space-x-2">
            {requests.map((request) => (
              <Button
                key={request._id}
                variant="secondary"
                className="rounded-full pl-0"
                size="sm"
                onClick={() => setOpenDialogId(request._id)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <TiUserAdd className="text-3xl" />
                </div>
                {request.user.name}
              </Button>
            ))}
          </div>
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
      {requests.map((request) => (
        <PendingRequestDialog
          groupId={groupId}
          key={request._id}
          request={request}
          isOpen={openDialogId === request._id}
          onOpenChange={(open) => setOpenDialogId(open ? request._id : null)}
        />
      ))}
    </>
  )
}
