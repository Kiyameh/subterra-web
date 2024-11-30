"use client";
import React from "react";

import MembershipRequestDialog from "@/components/boards/_interaction/membership-request-dialog";
import LinkButton from "@/components/navigation/link-button";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";

interface MembershipRequestBannerProps {
  groupId: string;
  userId?: string;
}
/**
 * Banner que abre el dialogo para enviar una solicitud de membresía al grupo
 * @param userId <string> Id del usuario que envía la solicitud
 * @param groupId <string> Id del grupo al que se envía la solicitud
 */
export default function MembershipRequestBanner({
  groupId,
  userId,
}: MembershipRequestBannerProps) {
  const [bannerOpen, setBannerOpen] = React.useState(true);

  if (!bannerOpen) return null;

  return (
    <div className="flex rounded-lg bg-card p-2 text-card-foreground">
      <div className="flex grow gap-3 md:items-center md:justify-center">
        <span>¿Quieres formar parte del grupo?</span>

        {userId ? (
          <MembershipRequestDialog userId={userId} groupId={groupId}>
            <Button>Envía tu solicitud</Button>
          </MembershipRequestDialog>
        ) : (
          <LinkButton label="Inicia sesión" href="/auth/login" />
        )}
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
  );
}
