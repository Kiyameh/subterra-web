import { Badge } from "@/components/ui/badge";
import React from "react";
interface MultiChipSlotProps {
  label: string;
  chips: string[] | number[];
  icon?: React.ReactNode;
}

export default function MultiChipSlot({
  label,
  chips,
  icon,
}: MultiChipSlotProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted p-2 md:px-4">
      <div className="flex items-center gap-1">
        <span className="text-card-foreground">{icon}</span>
        <span className="text-card-foreground">{label}</span>
      </div>
      <span className="flex flex-wrap items-center gap-1 text-sm">
        {chips.map((chip, index) => {
          return (
            <Badge
              className="border border-muted-foreground bg-secondary"
              key={index}
            >
              {chip.toString()}
            </Badge>
          );
        })}
      </span>
    </div>
  );
}
