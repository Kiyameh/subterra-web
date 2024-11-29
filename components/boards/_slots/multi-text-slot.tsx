import React from "react";

interface MultiTextSlotProps {
  label?: string;
  multitext?: string[];
  icon?: React.ReactNode;
}
export default function MultiTextSlot({
  label,
  multitext,
  icon,
}: MultiTextSlotProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted p-2 md:px-4">
      <div className="flex items-center gap-1">
        <span className="text-card-foreground">{icon}</span>
        <span className="text-card-foreground">{label}</span>
      </div>
      <span className="text-sm text-muted-foreground md:text-base">
        {multitext?.map((text, index) => (
          <span key={index}>
            {text}
            {index < multitext.length - 1 ? ", " : ""}
          </span>
        ))}
      </span>
    </div>
  );
}
