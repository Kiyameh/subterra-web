import React, {Suspense} from 'react'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import SkeletonCard from '@/components/cards/skeleton-card'
import ProfilePanel from '@/components/_authentication/profile-panel'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {auth, signOut} from '@/auth'
import {redirect} from 'next/navigation'
import {Button} from '@/components/ui/button'

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
