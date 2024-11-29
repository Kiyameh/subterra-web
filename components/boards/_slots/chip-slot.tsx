import { Badge } from "@/components/ui/badge";
import React from "react";
interface ChipSlotProps {
  label: string;
  chip: string | number;
  icon?: React.ReactNode;
}

export default function ChipSlot({ label, chip, icon }: ChipSlotProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted p-2 md:px-4">
      <div className="flex items-center gap-1">
        <span className="text-card-foreground">{icon}</span>
        <span className="text-card-foreground">{label}</span>
      </div>
      <span className="text-sm">
        <Badge>{chip.toString()}</Badge>
      </span>
    </div>
  );
}
