import React, {Suspense} from 'react'
import {auth} from '@/app/(authentication)/auth'
import {User} from '@/database/models/User.model'
import AccountMenu from './account-menu'
import LoginButton from './login-button'

export default async function AccountNav() {
  const session = await auth()

  return (
    <div>
      <Suspense>
        {session?.user ? (
          <AccountMenu user={session.user as User} />
        ) : (
          <LoginButton />
        )}
      </Suspense>
    </div>
  )
}
