import PageContainer from '@/components/theming/page-container'
import SquareButton from '@/components/_Atoms/buttons/square-button'
import React from 'react'
import {PiAvocadoFill} from 'react-icons/pi'
import {RiInputField} from 'react-icons/ri'
import Link from 'next/link'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import {BsTextareaResize} from 'react-icons/bs'
import {BsAppIndicator} from 'react-icons/bs'
import {CiViewTable} from 'react-icons/ci'
import {CgPlayButtonR} from 'react-icons/cg'
import {FiBox} from 'react-icons/fi'

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
          <Link href="/admin/component-showcase/cells">
            <SquareButton
              color="staff"
              icon={<CiViewTable />}
              text="Cells"
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
    </PageContainer>
  )
}
