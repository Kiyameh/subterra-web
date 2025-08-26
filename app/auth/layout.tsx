import React from 'react'

import PageContainer from '@/components/Organisms/theme/page-container'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return <PageContainer>{children}</PageContainer>
}
