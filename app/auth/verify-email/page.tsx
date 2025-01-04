import React from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {UserProfileCard} from '@/components/_Atoms/slots/user-slots'
import {auth} from '@/auth'
import ErrorCard from '@/components/_Molecules/cards/500-error'

export default async function EmailVerificationPage() {
  const user = (await auth())?.user

  if (!user) return <ErrorCard text="Intentalo de nuevo más tarde" />

  return (
    <BasicCard>
      <div className="space-y-6">
        <UserProfileCard user={user} />
        <p>Tu cuenta se ha verificado correctamente</p>{' '}
        <LinkButton
          href="/"
          label="Ir a inicio"
        />
      </div>
    </BasicCard>
  )
}
