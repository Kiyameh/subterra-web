import SquareButton from '@/components/Molecules/buttons/square-button'
import React from 'react'
import Link from 'next/link'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import {RiInputField} from 'react-icons/ri'
import {BsTextareaResize} from 'react-icons/bs'
import {BsAppIndicator} from 'react-icons/bs'
import {CgPlayButtonR} from 'react-icons/cg'
import {FiBox} from 'react-icons/fi'

export default function ComponentsShowcasePage() {
  return (
    <CardWithHeader
      glassmorphism
      defaultWidth="lg"
      cardSubHeader={
        <div className="flex items-center gap-3">
          <h1 className="text-xl">Muestrario componentes</h1>
        </div>
      }
    >
      <div className="flex flex-row gap-2 flex-wrap items-center justify-center">
        <Link href="/admin/component-showcase/fields">
          <SquareButton
            color="staff"
            icon={<RiInputField />}
            text="Fields"
          />
        </Link>
        <Link href="/admin/component-showcase/slots">
          <SquareButton
            color="staff"
            icon={<BsTextareaResize />}
            text="Slots"
          />
        </Link>
        <Link href="/admin/component-showcase/badges">
          <SquareButton
            color="staff"
            icon={<BsAppIndicator />}
            text="Badges"
          />
        </Link>
        <Link href="/admin/component-showcase/buttons">
          <SquareButton
            color="staff"
            icon={<CgPlayButtonR />}
            text="Buttons"
          />
        </Link>
        <Link href="/admin/component-showcase/boxes">
          <SquareButton
            color="staff"
            icon={<FiBox />}
            text="Boxes"
          />
        </Link>
      </div>
    </CardWithHeader>
  )
}
