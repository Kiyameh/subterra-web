import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {MultiTextSlot} from '@/components/_Atoms/slots/text-slots'
import {BooleanSlot} from '@/components/_Atoms/slots/chip-slots'
import {MultiChipSlot} from '@/components/_Atoms/slots/chip-slots'
import {DistanceSlot} from '@/components/_Atoms/slots/number-slots'
import {IoMdInformationCircle} from 'react-icons/io'
import {SystemSlot} from '@/components/_Atoms/slots/documents-slots'
import Divider from '@/components/_Atoms/boxes/divider'
import {PopulatedCave} from '@/database/services/cave.actions'

export default function CaveInfoCard({cave}: {cave: PopulatedCave}) {
  return (
    <BasicCard
      key="cave_info_card"
      cardHeader={
        <CardTitle
          title={'Información general'}
          icon={<IoMdInformationCircle />}
        />
      }
    >
      <TextSlot
        label="ID"
        value={cave._id}
      />
      <TextSlot
        label="Catálogo externo"
        value={cave.catalog}
      />
      <MultiTextSlot
        label="Siglas de exploración"
        values={cave.initials}
      />
      <TextSlot
        label="Nombre"
        value={cave.name}
      />
      <MultiTextSlot
        label="Nombres alternativos"
        values={cave.alt_names}
      />

      <MultiChipSlot
        label="Morfología"
        values={cave.cave_shapes}
      />
      <BooleanSlot
        label="Regalaciones"
        value={cave.regulations}
      />
      <TextSlot
        textArea
        label="Descripción de las regulaciones"
        value={cave.regulation_description}
      />
      <DistanceSlot
        label="Longitud"
        valueInMeters={cave.length}
      />
      <DistanceSlot
        label="Profundidad"
        valueInMeters={cave.depth}
      />
      {cave.system && (
        <>
          <Divider text="Pertenece al sistema" />
          <SystemSlot system={cave.system} />
        </>
      )}
    </BasicCard>
  )
}
