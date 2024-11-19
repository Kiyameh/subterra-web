import React from 'react'

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#11366F] via-[#132034] to-[#000000]">
      {children}
    </main>
  )
}
