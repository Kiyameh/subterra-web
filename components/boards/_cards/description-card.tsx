import React from "react";
import CardTitleSlot from "../_slots/card-title-slot";

interface DescriptionCardProps {
  title?: string;
  description?: string;
}
export default function DescriptionCard({
  title = "Descripción",
  description,
}: DescriptionCardProps) {
  return (
    <div className="flex min-h-96 flex-col gap-3 rounded-lg bg-card p-4">
      <CardTitleSlot title={title} />
      <p className="text-card-foreground">{description}</p>
    </div>
  );
}
