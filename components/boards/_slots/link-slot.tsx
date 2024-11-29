import Link from "next/link";
import React from "react";
import { HiLink } from "react-icons/hi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

interface LinkSlotProps {
  label: string;
  href: string;
  placeholder?: string;
  type?: "external" | "email" | "internal";
}

export default function LinkSlot({
  label = "Url",
  href,
  placeholder,
  type = "internal",
}: LinkSlotProps) {
  let icon;
  switch (type) {
    case "external":
      icon = <FaExternalLinkAlt />;
      break;
    case "email":
      icon = <MdOutlineEmail />;
      break;
    default:
      icon = <HiLink />;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted p-2 md:px-4">
      <span className="text-card-foreground">{label}</span>
      <Link
        href={href}
        className="flex items-center gap-1 text-sm text-muted-foreground"
      >
        {placeholder || href}
        <span className="text-primary">{icon}</span>
      </Link>
    </div>
  );
}
