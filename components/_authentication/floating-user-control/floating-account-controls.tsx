import React, {Suspense} from 'react'
import FloatingUserNavigation from './floating-user-navigation'
import FloatingLoginButton from './floating-login-button'
import {auth} from '@/auth'
import {Session} from 'next-auth'

/**
 * @version 1
 * @description Componente que renderiza un menú flotante con opciones de usuario si está logueado o un botón de login si no lo está
 */

export default async function FloatingAccountControls() {
  const session: Session | null = await auth()
  const user = session?.user

  return (
    <div>
      <Suspense>
        {user ? (
          <FloatingUserNavigation user={user} />
        ) : (
          <FloatingLoginButton />
        )}
      </Suspense>
    </div>
  )
}
