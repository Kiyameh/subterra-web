import React from "react";
import { auth } from "@/auth";
import { getOneGroup } from "@/database/services/group.services";
import { PopulatedGroup } from "@/database/models/Group.model";

import UnauthorizedCard from "@/components/displaying/401-unauthorized";
import NotFoundCard from "@/components/displaying/404-not-found";
import PendingRequestBanner from "@/components/boards/_interaction/pending-request-banner";

interface GroupEditionPageProps {
  params: Promise<{ group: string }>;
}

export default async function GroupEditionPage({
  params,
}: GroupEditionPageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group;

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null;

  // Obtener la sesión de usuario
  const session = await auth();
  const userId = session?.user?._id;

  // Validar roles de usuario:
  let isAdmin = false;
  if (group && userId) {
    isAdmin = group.admin._id === userId;
  }

  if (!isAdmin) {
    return <UnauthorizedCard />;
  }

  if (!group) {
    return <NotFoundCard />;
  }

  return (
    <div className="flex min-h-full w-full flex-col gap-4 p-4">
      <PendingRequestBanner
        requests={group.member_requests}
        groupId={group._id}
      />
      <h1 className="text-2xl font-bold">Página de administración de grupo</h1>
      <div>
        <pre>{JSON.stringify(group, null, 2)}</pre>
      </div>
    </div>
  );
}
