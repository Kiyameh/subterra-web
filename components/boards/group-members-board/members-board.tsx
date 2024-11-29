import { PopulatedGroup } from "@/database/models/Group.model";
import { columns, MembersInfo } from "./columns";
import { DataTable } from "./data-table";

interface MembersBoardProps {
  group: PopulatedGroup;
}

export default function MembersBoard({ group }: MembersBoardProps) {
  const rows = group.members.map((member) => ({
    name: member.name,
    email: member.email,
    fullname: member.fullname,
    isAdmin: group.admin._id === member._id,
    actions: "Acciones",
  }));

  return (
    <div className="container mx-auto py-10">
      <h1>Members of {group.name}</h1>
      <DataTable columns={columns} data={rows as MembersInfo[]} />
    </div>
  );
}
