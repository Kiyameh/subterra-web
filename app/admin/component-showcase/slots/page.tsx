import React from 'react'
import PageContainer from '@/components/theming/page-container'
import {MultiTextSlot, TextSlot} from '@/components/_Atoms/slots/text-slots'
import {
  BooleanSlot,
  ChipSlot,
  MultiChipSlot,
} from '@/components/_Atoms/slots/chip-slots'
import {LinkSlot} from '@/components/_Atoms/slots/link-slots'
import {
  DistanceSlot,
  NumberSlot,
  TimeSlot,
} from '@/components/_Atoms/slots/number-slots'
import {AdminBadge, EditorBadge} from '@/components/_Atoms/slots/user-slots'
import {GroupCard} from '@/components/_Atoms/slots/group-slots'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'

export default function SlotsShowcasePage() {
  return (
    <PageContainer className="flex flex-row gap-6">
      <CardWithHeader cardSubHeader="Slots showcase">
        <TextSlot
          label="TextSlot"
          value="Esto es un texto"
        />
        <MultiTextSlot
          label="MultiTextSlot"
          values={['Este es uno', 'Este es otro']}
        />
        <ChipSlot
          label="ChipSlot"
          value="Esto es un chip"
        />
        <MultiChipSlot
          label="MultiChipSlot"
          values={['Este es uno', 'Este es otro']}
        />
        <BooleanSlot
          label="BooleanSlot"
          value={true}
        />
        <LinkSlot
          label="Internal LinkSlot"
          value="/admin/showcase"
          type="internal"
        />
        <LinkSlot
          label="External LinkSlot"
          value="https://www.google.com"
          type="external"
        />
        <LinkSlot
          label="Email LinkSlot"
          value="subterra@mail.com"
          type="email"
        />
        <LinkSlot
          label="Phone LinkSlot"
          value="123456789"
          type="phone"
        />
        <NumberSlot
          label="NumberSlot"
          value={123456789}
        />
        <NumberSlot
          label="NumberSlot with dots"
          value={123456789}
          withMillarDots
        />
        <NumberSlot
          label="NumberSlot with endAdornment"
          value={123456789}
          endAdornment="cm"
        />
        <DistanceSlot
          label="DistanceSlot"
          valueInMeters={123456789}
        />
        <TimeSlot
          label="TimeSlot"
          valueInMinutes={12345}
        />

        <h2>User Slots</h2>
        <div className="flex flex-row gap-6">
          <p>Role badges:</p>
          <AdminBadge
            label="Admin"
            helperText="Eres administrador"
          />
          <EditorBadge
            label="Editor"
            helperText="Eres editor"
          />
        </div>
        <GroupCard
          groupIndex={{
            fullname: 'Grupo de prueba',
            province: 'Provincia de prueba',
            _id: '123456789',
            name: 'Grupo de prueba',
          }}
        />
      </CardWithHeader>
    </PageContainer>
  )
}
