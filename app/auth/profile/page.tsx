import React, {Suspense} from 'react'
import {redirect} from 'next/navigation'
import {auth, signOut} from '@/auth'

import {Button} from '@/components/Atoms/button'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import LinkButton from '@/components/Molecules/buttons/link-button'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import ProfilePanel from '@/components/Organisms/authentication/profile-panel'

export default async function ProfilePage() {
  const user = (await auth())?.user

  // Si no hay usuario, reenviar a la página de inicio de sesión:

  if (!user) redirect('/auth/login')

  return (
    <CardWithHeader>
      <Suspense fallback={<SkeletonCard defaultWidth="sm" />}>
        <ProfilePanel />
      </Suspense>
      <LinkButton
        href="/auth/profile/edit"
        variant="secondary"
        label="Editar perfil"
      />
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <Button
          type="submit"
          variant="ghost"
          className="w-full"
        >
          Cerrar sesión
        </Button>
      </form>
    </CardWithHeader>
  )
}
