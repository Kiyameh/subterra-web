'use client'
import {usePathname, useRouter} from 'next/navigation'
import React from 'react'

export default function LoginWrapper({children}: {children: React.ReactNode}) {
  const path = usePathname()
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/auth/login?src=${path}`)}>{children}</div>
  )
}
