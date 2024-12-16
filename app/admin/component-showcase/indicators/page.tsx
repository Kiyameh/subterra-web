import React from 'react'

import PageContainer from '@/components/theming/page-container'

import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import InfoBadge from '@/components/_Atoms/indicators/info-badge'

export default function IndicatorsShowcasePage() {
  return (
    <PageContainer className="flex flex-row gap-6">
      <CardWithHeader cardSubHeader="Indicators showcase">
        <p>InfoBadge</p>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col space-y-2">
            <InfoBadge
              description="This is a description"
              label="withIcon=false"
              withIcon={false}
            />
            <InfoBadge
              description="This is a description"
              label="Info badge"
              color="info"
            />
            <InfoBadge
              description="This is a description"
              label="Info badge"
              color="destructive"
            />
            <InfoBadge
              description="This is a description"
              label="Info badge"
              color="success"
            />
            <InfoBadge
              description="This is a description"
              label="Info badge"
              color="warning"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <InfoBadge
              description="This is a description"
              color="info"
            />
            <InfoBadge
              description="This is a description"
              color="destructive"
            />
            <InfoBadge
              description="This is a description"
              color="success"
            />
            <InfoBadge
              description="This is a description"
              color="warning"
            />
          </div>
        </div>
      </CardWithHeader>
    </PageContainer>
  )
}
