import PageContainer from '@/components/theming/page-container'
import SquareButton from '@/components/_Atoms/buttons/square-button'
import React from 'react'
import {PiAvocadoFill} from 'react-icons/pi'
import {RiInputField} from 'react-icons/ri'
import Link from 'next/link'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import {BsTextareaResize} from 'react-icons/bs'

export default function ComponentsShowcasePage() {
  return (
    <PageContainer>
      <CardWithHeader
        glassmorphism
        cardSubHeader={
          <div className="flex items-center gap-3">
            <PiAvocadoFill className="text-4xl text-staff" />
            <h1 className="text-xl">Muestrario componentes</h1>
          </div>
        }
      >
        <div className="flex flex-row gap-2 items-center justify-center">
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
        </div>
      </CardWithHeader>
    </PageContainer>
  )
}
