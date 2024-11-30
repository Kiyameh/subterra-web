"use client";
import React from "react";

import { PopulatedGroup } from "@/database/models/Group.model";
import { Answer } from "@/database/types/answer.type";
import DbAwnserBox from "@/components/displaying/db-answer-box";
import {
  acceptMemberRequest,
  rejectMemberRequest,
} from "@/database/services/group.services";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaUserCheck } from "react-icons/fa";
import { Loader2 } from "lucide-react";

/**
 * Diálogo para aceptar o rechazar una solicitud de acceso al grupo
 * @param groupId <string> Id del grupo al que se envía la solicitud
 * @param request <PopulatedGroup["member_requests"][0]> Solicitud de acceso
 * @param isOpen <boolean> Estado de apertura del diálogo
 * @param onOpenChange <function> Función para cambiar el estado de apertura del diálogo
 *
 */

interface PendingRequestDialogProps {
  groupId: string;
  request: PopulatedGroup["member_requests"][0];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PendingRequestDialog({
  groupId,
  request,
  isOpen,
  onOpenChange,
}: PendingRequestDialogProps) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const handleAccept = () => {
    setDbAnswer(null);
    startTransition(async () => {
      const answer = await acceptMemberRequest(groupId, request._id);
      setDbAnswer(answer);
    });

    if (dbAnswer?.ok) {
      onOpenChange(false);
    }
  };

  const handleReject = () => {
    setDbAnswer(null);
    startTransition(async () => {
      const answer = await rejectMemberRequest(groupId, request._id);
      setDbAnswer(answer);
    });

    if (dbAnswer?.ok) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
            <AvatarImage src={request.user.image} alt={request.user.name} />
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
          <Button disabled={isPending} variant="outline" onClick={handleReject}>
            {isPending && <Loader2 className="animate-spin" />}
            Rechazar
          </Button>
          <Button disabled={isPending} onClick={handleAccept}>
            {isPending && <Loader2 className="animate-spin" />}
            Acceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
