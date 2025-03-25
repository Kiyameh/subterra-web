import React from 'react'

import BasicCard from '@/components/Molecules/boxes/basic-card'

import FakeForm from './fake-form'

export default function FieldsShowcasePage() {
  return (
    <div className="flex flex-row gap-6 flex-wrap">
      <BasicCard cardHeader="Empty Fake Form">
        <FakeForm empty />
      </BasicCard>
      <BasicCard cardHeader="Fake Form">
        <FakeForm />
      </BasicCard>
    </div>
  )
}
