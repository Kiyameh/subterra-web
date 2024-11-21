import React from 'react'

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      {children}
    </main>
  )
}
