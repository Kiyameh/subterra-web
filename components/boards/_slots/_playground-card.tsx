'use client'
import BasicCard from '@/components/containing/basic-card'
import React from 'react'
import {MdInfo} from 'react-icons/md'
import {BooleanSlot, ChipSlot, MultiChipSlot} from './chip-slots'
import {LinkSlot} from './link-slots'
import {NumberSlot, DistanceSlot, TimeSlot} from './number-slots'
import {TextSlot, MultiTextSlot} from './text-slots'

export default function PlaygroundCard() {
  return (
    <>
      <BasicCard cardHeader="First playground card">
        <TextSlot
          label="Texto normal"
          value="Hola mundo"
        />
        <TextSlot label="Texto vacio" />
        <TextSlot
          label="Texto grande"
          value="Hola mundo, esto es un texto grande que no cabe en una sola línea. Ademas, tiene que ser lo suficientemente largo para que se pueda ver el comportamiento del texto en el espacio disponible."
        />
        <TextSlot
          endAdornment={<MdInfo />}
          label="Texto con icono"
          value="Hola mundo"
        />
        <NumberSlot
          label="Numero"
          value={123}
        />
        <NumberSlot label="Numero vacio" />
        <NumberSlot
          label="Numero con dots"
          value={123556512}
          withMillarDots
        />
        <NumberSlot
          endAdornment={'€'}
          label="Numero con icono"
          value={123}
        />

        <DistanceSlot
          label="Distancia"
          valueInMeters={1000}
        />
        <DistanceSlot label="Distancia vacia" />
        <TimeSlot
          label="Tiempo"
          valueInMinutes={90}
        />
        <TimeSlot label="Tiempo vacio" />
      </BasicCard>
      <BasicCard cardHeader="Second playground card">
        <BooleanSlot
          label="Boolean"
          value={true}
          invertedColor
        />
        <BooleanSlot
          label="Boolean false"
          value={false}
          invertedColor
        />
        <BooleanSlot label="Boolean vacio" />
        <ChipSlot
          label="Chip"
          value="Ejemplo"
        />
        <ChipSlot
          label="Chip vacio"
          value=""
        />
        <ChipSlot
          label="Chip con icono"
          value="Ejemplo"
          endAdornment={<MdInfo />}
        />
        <ChipSlot
          label="Chip con color"
          value="Ejemplo"
          emphasis
        />
        <MultiChipSlot
          values={['Ejemplo', 'Ejemplo2']}
          label="MultiChip"
        />
        <MultiChipSlot
          values={[]}
          label="MultiChip vacio"
        />
        <MultiChipSlot
          values={['Ejemplo', 'Ejemplo2']}
          label="MultiChip con icono"
          endAdornment={<MdInfo />}
        />
        <MultiChipSlot
          values={['Ejemplo', 'Ejemplo2']}
          label="MultiChip con color"
          emphasis
        />
      </BasicCard>
      <BasicCard cardHeader="Third playground card">
        <LinkSlot
          label="Link"
          value="https://google.com"
          type="external"
        />
        <LinkSlot
          label="Link incompleto"
          value="www.google.com"
          type="external"
        />
        <LinkSlot
          label="Link interno"
          value="/about"
          type="internal"
        />
        <LinkSlot
          label="Link email"
          value="info@google.com"
          type="email"
        />
        <LinkSlot
          label="Telefono"
          value="+3423456789"
          type="phone"
        />
        <LinkSlot
          label="Link vacio"
          value=""
        />
        <MultiTextSlot
          label="MultiText"
          values={['Ejemplo', 'Ejemplo2']}
        />
        <MultiTextSlot
          label="MultiText vacio"
          values={[]}
        />
        <MultiTextSlot
          label="MultiText con icono"
          values={['Ejemplo', 'Ejemplo2']}
          endAdornment={<MdInfo />}
        />
        <MultiTextSlot
          label="Multitext con numeros"
          values={[3, 123, 5]}
        />
      </BasicCard>
    </>
  )
}
