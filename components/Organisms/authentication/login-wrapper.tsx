'use client'
import React from 'react'
import {signIn} from 'next-auth/react'

/**
 * @version 1
 * @description Componente que envuelve a otros componentes y los comvierte en un enlace para iniciar sesión. Añade a la url callbackUrl de next-auth
 */
export default function LoginWrapper({children}: {children: React.ReactNode}) {
  return (
    <div
      onClick={async () => {
        await signIn()
      }}
    >
      {children}
    </div>
  )
}
