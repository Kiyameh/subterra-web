import React from 'react'

import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {BiMessageDots} from 'react-icons/bi'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SimpleBox from '@/components/_Atoms/boxes/simple-box'
import {Answer} from '@/database/types/Answer.type'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import InfoBox from '@/components/_Atoms/boxes/info-box'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'

export default function BoxesShowcasePage() {
  return (
    <div className="flex flex-col gap-2">
      <HeaderBox
        text="HeaderBox"
        icon={<BiMessageDots />}
      />
      <SimpleBox>SimpleBox</SimpleBox>
      <SimpleBox glassmorphism>GlassMorphed</SimpleBox>
      <SimpleBox glassmorphism>
        <CardTitle
          title="Card Title"
          subtitle="Subtitle"
          icon={<BiMessageDots />}
        />
      </SimpleBox>
      <BasicCard
        cardHeader="Esto es un cardHeader"
        cardFooter="Esto es un cardFooter"
        glassmorphism
      >
        <p>Basic Card</p>
      </BasicCard>
      <CardWithHeader
        cardSubHeader="Esto es un cardSubHeader"
        cardFooter="Esto es un cardFooter"
        glassmorphism
      >
        <p>Card With Header</p>
      </CardWithHeader>
      <SimpleBox
        className="space-y-2"
        defaultWidth="md"
        glassmorphism
      >
        <CollapsibleBox
          title="CollapsibleBox"
          color="info"
        >
          Contenido desplegable
        </CollapsibleBox>
        <CollapsibleBox
          title="CollapsibleBox"
          color="destructive"
        />
        <CollapsibleBox
          title="CollapsibleBox"
          color="success"
        />
        <CollapsibleBox
          title="CollapsibleBox"
          color="warning"
          icon={<BiMessageDots />}
        />
      </SimpleBox>
      <SimpleBox
        glassmorphism
        defaultWidth="md"
        className="space-y-2"
      >
        <DbAwnserBox
          answer={
            {
              ok: true,
              message: 'DbAwnserBox',
            } as Answer
          }
        />

        <DbAwnserBox
          answer={
            {
              ok: false,
              message: 'DbAwnserBox',
            } as Answer
          }
        />
      </SimpleBox>
      <SimpleBox
        glassmorphism
        defaultWidth="md"
        className="space-y-2"
      >
        <InfoBox title="InfoBox">Texto interior</InfoBox>
        <InfoBox
          title="InfoBox"
          color="destructive"
        />
        <InfoBox
          title="InfoBox"
          color="success"
        />
        <InfoBox
          title="InfoBox"
          color="warning"
          icon={<BiMessageDots />}
        />
      </SimpleBox>
      <SimpleBox glassmorphism>
        ReactHookFormErrorBox
        <ReactHookFormErrorBox
          errors={{
            name: {
              type: 'required',
              message: 'ReactHookFormErrorBox',
            },
            email: {
              type: 'required',
              message: 'Email is required',
            },
          }}
        />
      </SimpleBox>
    </div>
  )
}
