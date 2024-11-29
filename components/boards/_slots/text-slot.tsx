import React from "react";

interface TextSlotProps {
  label?: string;
  text?: string;
  icon?: React.ReactNode;
}
export default function TextSlot({ label, text, icon }: TextSlotProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted p-2 md:px-4">
      <div className="flex items-center gap-1">
        <span className="text-card-foreground">{icon}</span>
        <span className="text-card-foreground">{label}</span>
      </div>
      <span className="text-sm text-muted-foreground md:text-base">{text}</span>
    </div>
  );
}
