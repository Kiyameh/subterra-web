import React from "react";
import CardTitleSlot from "../_slots/card-title-slot";
import TextSlot from "../_slots/text-slot";
import LinkSlot from "../_slots/link-slot";

interface ContactCardProps {
  street?: string;
  portal_number?: string;
  floor?: string;
  door?: string;
  postal_code?: number;
  city?: string;
  province?: string;
  country?: string;
  phone?: string;
  email?: string;
  webpage?: string;
}

export default function ContactCard({
  street,
  portal_number,
  floor,
  door,
  postal_code,
  city,
  province,
  country,
  phone,
  email,
  webpage,
}: ContactCardProps) {
  const address = [street, portal_number, floor, door]
    .filter(Boolean)
    .join(", ");
  return (
    <div className="flex min-h-96 flex-col gap-3 rounded-lg bg-card p-4">
      <CardTitleSlot title="Datos de contacto" />
      <TextSlot label="Dirección" text={address} />
      <div className="grid grid-cols-2 gap-2">
        <TextSlot label="CP" text={postal_code?.toString()} />
        <TextSlot label="Ciudad" text={city} />
      </div>

      <TextSlot label="Provincia" text={`${province}, ${country}`} />
      <TextSlot label="Teléfono" text={phone} />
      {email && <LinkSlot label="Email" href={email} type="email" />}
      {webpage && <LinkSlot label="Web" href={webpage} />}
    </div>
  );
}
