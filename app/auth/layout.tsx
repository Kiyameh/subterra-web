import React from 'react'
import PageContainer from '@/components/theming/page-container'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return <PageContainer>{children}</PageContainer>
}
