import React from 'react'

import PageContainer from '@/components/theming/page-container'

import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'

export default function BoxesShowcasePage() {
  return (
    <PageContainer className="flex flex-row gap-6">
      <CardWithHeader cardSubHeader="Boxes showcase">
        <p>Boxes</p>
      </CardWithHeader>
    </PageContainer>
  )
}
