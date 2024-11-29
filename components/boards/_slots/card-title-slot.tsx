import Divider from "@/components/displaying/divider";
import React from "react";

interface CardTitleSlotProps {
  title: string;
}
export default function CardTitleSlot({ title }: CardTitleSlotProps) {
  return (
    <>
      <h3>{title}</h3>
      <Divider />
    </>
  );
}
