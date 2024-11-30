import { auth } from "@/auth";
import GroupLandingBoard from "@/components/boards/group-landing-board";
import NotFoundCard from "@/components/displaying/404-not-found";
import MembershipRequestBanner from "@/components/boards/_interaction/membership-request-banner";
import { PopulatedGroup } from "@/database/models/Group.model";
import { getOneGroup } from "@/database/services/group.services";

interface Props {
  params: Promise<{ group: string }>;
}

export default async function GroupLandingPage({ params }: Props) {
  // Obtener el nombre del grupo
  const groupName = (await params).group;

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null;

  // Obtener la sesión de usuario
  const session = await auth();
  const userId = session?.user?._id;

  // Validar roles de usuario:
  let isMember = false;
  if (userId && group) {
    group.members.map((member) => {
      if (member._id === userId) {
        isMember = true;
      }
    });
  }

  if (!group) {
    return <NotFoundCard />;
  } else {
    return (
      <div className="flex min-h-full w-full flex-col gap-4 p-4">
        {!isMember && (
          <MembershipRequestBanner groupId={group._id} userId={userId} />
        )}
        <GroupLandingBoard group={group} />
      </div>
    );
  }
}
