import React from 'react'
import PageContainer from '@/components/Organisms/theme/page-container'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'

export default function GuideLayout({children}: {children: React.ReactNode}) {
  return (
    <PageContainer>
      <CardWithHeader defaultWidth="xxl">{children}</CardWithHeader>
    </PageContainer>
  )
}
