import CustomCard from "@/components/containing/custom-card";
import InstancesBoard from "@/components/boards/all-instances-board/instances-board";
import React from "react";
import { LuBox } from "react-icons/lu";

export default function InstancesSection() {
  return (
    <section
      id="instances-section"
      className="flex min-h-screen w-full flex-col items-center justify-evenly bg-background p-5"
      style={{ backgroundImage: "url(/backgrounds/topography.svg)" }}
    >
      <CustomCard
        className="mb-5"
        title="Instancias"
        icon={<LuBox className="text-3xl" />}
        content="Aquí puedes encontrar las instancias desplegadas actualmente en Subterra."
      />
      <InstancesBoard />
    </section>
  );
}
