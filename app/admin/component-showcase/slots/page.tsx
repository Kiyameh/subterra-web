import React from 'react'

import {MultiTextSlot} from '@/components/Molecules/slots/text-slots'
import {TextSlot} from '@/components/Molecules/slots/text-slots'
import {MultiChipSlot} from '@/components/Molecules/slots/chip-slots'
import {ChipSlot} from '@/components/Molecules/slots/chip-slots'
import {BooleanSlot} from '@/components/Molecules/slots/chip-slots'
import {LinkSlot} from '@/components/Molecules/slots/link-slots'
import {TimeSlot} from '@/components/Molecules/slots/number-slots'
import {NumberSlot} from '@/components/Molecules/slots/number-slots'
import {DistanceSlot} from '@/components/Molecules/slots/number-slots'
import {UserProfileCard} from '@/components/Molecules/slots/user-slots'
import {AdminBadge} from '@/components/Molecules/slots/user-slots'
import {EditorBadge} from '@/components/Molecules/slots/user-slots'
import {GroupProfileCard} from '@/components/Molecules/slots/group-slots'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import Divider from '@/components/Molecules/boxes/divider'

import {BiAlarmAdd} from 'react-icons/bi'

export default function SlotsShowcasePage() {
  return (
    <div className="flex flex-row gap-6 flex-wrap">
      <CardWithHeader cardSubHeader="Slots showcase">
        <TextSlot
          label="TextSlot"
          value="Esto es un texto"
        />
        <TextSlot
          label="TextSlot & EndAdornment"
          value="Esto es un texto"
          endAdornment="Metros"
        />
        <TextSlot
          label="TextSlot & EndAdornment"
          value="Esto es un texto"
          endAdornment={<BiAlarmAdd />}
        />
        <TextSlot
          label="TextSlot & undefined"
          value={undefined}
        />

        <Divider />

        <MultiTextSlot
          label="MultiTextSlot"
          values={['Este es uno', 'Este es otro']}
        />
        <MultiTextSlot
          label="MultiTextSlot & EndAdornment"
          values={['Este es uno', 'Este es otro']}
          endAdornment={<BiAlarmAdd />}
        />
        <MultiTextSlot
          label="MultiTextSlot & undefined"
          values={undefined}
        />

        <Divider />

        <ChipSlot
          label="ChipSlot"
          value="Esto es un chip"
        />
        <ChipSlot
          label="ChipSlot & Empahsis"
          value="Esto es un chip"
          emphasis
        />
        <ChipSlot
          label="ChipSlot & EndAdornment"
          value="Esto es un chip"
          endAdornment={<BiAlarmAdd />}
        />
        <ChipSlot
          label="ChipSlot & StartAdornment"
          value="Esto es un chip"
          startAdornment={<BiAlarmAdd />}
        />
        <ChipSlot
          label="ChipSlot & undefined"
          value={undefined}
        />

        <Divider />

        <MultiChipSlot
          label="MultiChipSlot"
          values={['Este es uno', 'Este es otro']}
        />
        <MultiChipSlot
          label="MultiChipSlot & Empahsis"
          values={['Este es uno', 'Este es otro']}
          emphasis
        />
        <MultiChipSlot
          label="MultiChipSlot & EndAdornment"
          values={['Adorno', 'Al final']}
          endAdornment={<BiAlarmAdd />}
        />
        <MultiChipSlot
          label="MultiChipSlot & StartAdornment"
          values={['Adorno', 'Al inicio']}
          startAdornment={<BiAlarmAdd />}
        />
        <MultiChipSlot
          label="MultiChipSlot & undefined"
          values={undefined}
        />

        <Divider />
        <BooleanSlot
          label="BooleanSlot & true"
          value={true}
        />
        <BooleanSlot
          label="BooleanSlot & false"
          value={false}
        />
        <BooleanSlot
          label="BooleanSlot & invertedColor"
          value={false}
          invertedColor
        />
        <BooleanSlot
          label="BooleanSlot & undefined"
          value={undefined}
        />

        <Divider />

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
        <LinkSlot
          label="Undefined LinkSlot"
          value={undefined}
          type="phone"
        />

        <Divider />

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
          label="NumberSlot & endAdornment"
          value={123456789}
          endAdornment="cm"
        />
        <DistanceSlot
          label="DistanceSlot"
          valueInMeters={123456789}
        />
        <TimeSlot
          label="TimeSlot"
          valueInSeconds={360000}
        />
        <NumberSlot
          label="NumberSlot & undefined"
          value={undefined}
        />
      </CardWithHeader>
      <BasicCard cardHeader="Slots de user y group">
        <p>AdminBadge y EditorBadge</p>
        <div className="flex flex-row gap-6">
          <AdminBadge
            label="Coordinador"
            helperText="Eres coordinador"
          />
          <AdminBadge
            label="Admin"
            helperText="Eres administrador"
          />
          <EditorBadge
            label="Miembro"
            helperText="Eres miembro"
          />
          <EditorBadge
            label="Editor"
            helperText="Eres editor"
          />
        </div>
        <Divider />
        <p>UserProfileCard y GroupProfileCard</p>
        <GroupProfileCard
          groupIndex={{
            fullname: 'Grupo de prueba',
            province: 'Provincia de prueba',
            _id: '123456789',
            name: 'Grupo de prueba',
          }}
        />
        <UserProfileCard
          user={{
            _id: '123456789',
            name: 'Usuario de prueba',
            email: 'usuario@gmail.com',
            image: 'https://i.pravatar.cc/150?img=3',
          }}
        />
        <UserProfileCard
          user={{
            _id: '123456789',
            name: 'Usuario sin imagen',
            email: 'usuario@gmail.com',
          }}
        />
      </BasicCard>
    </div>
  )
}
