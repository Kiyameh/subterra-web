import SignInCard from '@/components/authenticating/signin-card'
import React from 'react'

export default function SigInPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-rose-900">
      <SignInCard />
    </main>
  )
}
