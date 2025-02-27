import React from 'react'
import FakeForm from './fake-form'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import FileField from '@/components/_Atoms/fields/file-field'

export default function FieldsShowcasePage() {
  return (
    <div className="flex flex-row gap-6 flex-wrap">
      <BasicCard cardHeader="Empty Fake Form">
        <FakeForm empty />
      </BasicCard>
      <BasicCard cardHeader="Fake Form">
        <FakeForm />
      </BasicCard>
      <BasicCard cardHeader="Upload image">
        <FileField />
      </BasicCard>
    </div>
  )
}
