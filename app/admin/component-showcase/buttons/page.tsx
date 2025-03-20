import React from 'react'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import DownAnchor from '@/components/Molecules/buttons/down-anchor'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'
import LinkButton from '@/components/Molecules/buttons/link-button'
import BackButton from '@/components/Molecules/buttons/back-button'
import SquareButton from '@/components/Molecules/buttons/square-button'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import Divider from '@/components/Molecules/boxes/divider'

import {BiMessageDots} from 'react-icons/bi'

export default function ButtonsShowcasePage() {
  return (
    <div className="flex flex-row gap-6">
      <CardWithHeader cardSubHeader="Buttons showcase">
        <Divider text="BackButton" />
        <div className="flex gap-2 items-center justify-center">
          <BackButton size="lg" />
          <BackButton />
          <BackButton size="sm" />
          <BackButton size="icon" />
        </div>
        <Divider text="DownAnchor" />
        <DownAnchor href="/admin/component-showcase/buttons" />
        <Divider text="FetchingErrorButton" />
        <FetchingErrorButton />
        <Divider text="LinkButton" />
        <LinkButton
          href="/admin/component-showcase/buttons"
          label="Botón enlace"
        />
        <Divider text="SquareButton" />
        <div className="flex gap-2 items-center justify-center">
          <SquareButton
            text="Cuadrado"
            icon={<BiMessageDots />}
          />
          <SquareButton
            text="Coloreado"
            icon={<BiMessageDots />}
            color="staff"
          />
        </div>
        <Divider text="SubmitButton" />
        <SubmitButton
          isPending={false}
          label="Enviar"
        />
        <SubmitButton
          isPending={true}
          label="Enviar"
        />
      </CardWithHeader>
    </div>
  )
}
