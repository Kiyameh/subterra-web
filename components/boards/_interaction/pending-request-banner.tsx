"use client";
import React from "react";

import { PopulatedGroup } from "@/database/models/Group.model";
import PendingRequestDialog from "@/components/boards/_interaction/pending-request-dialog";

import { Button } from "@/components/ui/button";
import { TiUserAdd } from "react-icons/ti";

interface PendingRequestBannerProps {
  requests: PopulatedGroup["member_requests"];
  groupId: string;
}

/**
 * Banner que muestra las solicitudes pendientes de revisar
 * @param requests <PopulatedGroup["member_requests"]> Solicitudes pendientes
 * @param groupId <string> Id del grupo al que se envían las solicitudes
 */

export default function PendingRequestBanner({
  requests,
  groupId,
}: PendingRequestBannerProps) {
  const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);

  if (requests.length === 0) return null;

  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-card px-6 py-2 text-muted-foreground">
        <span>Hay solicitudes pendientes de revisar:</span>
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
  );
}
