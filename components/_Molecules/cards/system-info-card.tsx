import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {TextSlot} from '@/components/_Atoms/slots/text-slots'
import {MultiTextSlot} from '@/components/_Atoms/slots/text-slots'
import {BooleanSlot} from '@/components/_Atoms/slots/chip-slots'
import {DistanceSlot} from '@/components/_Atoms/slots/number-slots'
import {IoMdInformationCircle} from 'react-icons/io'
import {PopulatedSystem} from '@/database/models/System.model'

export default function SystemInfoCard({system}: {system: PopulatedSystem}) {
  return (
    <BasicCard
      cardHeader={
        <CardTitle
          title={'Información general'}
          icon={<IoMdInformationCircle />}
        />
      }
    >
      <TextSlot
        label="ID"
        value={system._id}
      />
      <TextSlot
        label="Catálogo externo"
        value={system.catalog}
      />
      <MultiTextSlot
        label="Siglas de exploración"
        values={system.initials}
      />
      <TextSlot
        label="Nombre"
        value={system.name}
      />
      <MultiTextSlot
        label="Nombres alternativos"
        values={system.alt_names}
      />

      <TextSlot
        label="Macizo"
        value={system.massif}
      />
      <BooleanSlot
        label="Regulaciones"
        value={system.regulations}
      />
      <TextSlot
        textArea
        label="Descripción de las regulaciones"
        value={system.regulation_description}
      />
      <DistanceSlot
        label="Longitud"
        valueInMeters={system.length}
      />
      <DistanceSlot
        label="Profundidad"
        valueInMeters={system.depth}
      />
    </BasicCard>
  )
}
