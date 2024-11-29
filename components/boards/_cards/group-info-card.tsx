import React from "react";
import CardTitleSlot from "../_slots/card-title-slot";
import TextSlot from "../_slots/text-slot";
import LinkSlot from "../_slots/link-slot";
import MultiChipSlot from "../_slots/multi-chip-slot";
import { MdNumbers } from "react-icons/md";

interface GroupInfoCardProps {
  fullname: string;
  name: string;
  _id: string;
  acronym?: string;
  group_categories?: string[];
}

export default function GroupInfoCard({
  fullname,
  name,
  acronym,
  _id,
  group_categories,
}: GroupInfoCardProps) {
  return (
    <div className="flex min-h-96 flex-col gap-3 rounded-lg bg-card p-4">
      <CardTitleSlot title={fullname} />
      <TextSlot label="ID" text={_id} icon={<MdNumbers />} />
      <TextSlot label="Ácronimo" text={acronym} />
      <LinkSlot
        label="URL"
        href={`/group/${name}`}
        placeholder={`https://subterra.app/group/${name}`}
      />
      <MultiChipSlot label="Categorias" chips={group_categories || []} />
    </div>
  );
}
