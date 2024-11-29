import MembersBoard from "@/components/boards/group-members-board/members-board";
import { auth } from "@/auth";
import UnauthorizedCard from "@/components/displaying/401-unauthorized";
import NotFoundCard from "@/components/displaying/404-not-found";
import { PopulatedGroup } from "@/database/models/Group.model";
import { getOneGroup } from "@/database/services/group.services";
import { Session } from "next-auth";

interface Props {
  params: Promise<{ group: string }>;
}

export default async function GroupMembersPage({ params }: Props) {
  let isMember = false;
  // Obtener el grupo actual con los miembros poblados:
  const groupName = (await params).group;

  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null;

  if (!group) {
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
      />
    );
  }

  // Obtener el usuario actual
  const session: Session | null = await auth();
  const userId = session?.user._id;

  // Comprobar si el usuario actual es miembro del grupo
  if (group && userId) {
    isMember = group.members.some(
      (member) => member._id.toString() === userId.toString(),
    );
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      {isMember ? <MembersBoard group={group} /> : <UnauthorizedCard />}
    </section>
  );
}
