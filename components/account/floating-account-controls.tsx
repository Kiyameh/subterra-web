import React, {Suspense} from 'react'
import {auth} from '@/app/(authentication)/auth'
import {User} from '@/database/models/User.model'
import FloatingUserNavigation from './floating-user-navigation'
import FloatingLoginButton from './floating-login-button'

export default async function FloatingAccountControls() {
  const session = await auth()

  return (
    <div>
      <Suspense>
        {session?.user ? (
          <FloatingUserNavigation user={session.user as User} />
        ) : (
          <FloatingLoginButton />
        )}
      </Suspense>
    </div>
  )
}
