'use client'
import {useRouter} from 'next/navigation'
import React from 'react'

interface SignInButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export default function SignInControl({
  children,
  mode = 'redirect',
  asChild,
}: SignInButtonProps) {
  const router = useRouter()

  const onClick = () => {
    router.push('/signin')
  }

  if (mode === 'modal') {
    // TODO: Implementar modal
  }
  if (asChild) {
    //TODO
  }

  return (
    <span
      onClick={onClick}
      className="cursor-pointer"
    >
      {children}
    </span>
  )
}
