import React from "react";
import ContactCard from "@/components/boards/_cards/contact-card";
import DescriptionCard from "@/components/boards/_cards/description-card";
import GroupInfoCard from "@/components/boards/_cards/group-info-card";
import ImageCard from "@/components/boards/_cards/image-card";
import { PopulatedGroup } from "@/database/models/Group.model";

interface GroupLandingBoardProps {
  group: PopulatedGroup;
}

export default function GroupLandingBoard({ group }: GroupLandingBoardProps) {
  return (
    <section className="flex min-h-full w-full flex-col gap-4">
      <ImageCard />
      <main className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <GroupInfoCard
          fullname={group.fullname}
          name={group.name}
          acronym={group.acronym}
          _id={group._id}
          group_categories={group.group_categories}
        />
        <DescriptionCard description={group.description} />
        <ContactCard
          street={group.street}
          portal_number={group.portal_number}
          floor={group.floor}
          door={group.door}
          postal_code={group.postal_code}
          city={group.city}
          province={group.province}
          country={group.country}
          phone={group.phone}
          email={group.email}
          webpage={group.webpage}
        />
      </main>
    </section>
  );
}
