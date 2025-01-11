'use client'
import ErrorCard from '@/components/cards/500-error'
import PageContainer from '@/components/theming/page-container'

export default function NotFound() {
  return (
    <PageContainer>
      <ErrorCard />
    </PageContainer>
  )
}
