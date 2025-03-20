import React, {Suspense} from 'react'
import Divider from '@/components/Molecules/boxes/divider'
import LinkButton from '@/components/Molecules/buttons/link-button'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import LoginForm from '@/components/Organisms/authentication/login-form'
import SigninGoogle from '@/components/Organisms/authentication/signin-google'
import {auth} from '@/auth'
import {redirect} from 'next/navigation'

export default async function LoginPage() {
  const user = (await auth())?.user

  // Si hay usuario, reenviar a la página de perfil:

  if (user?.name) redirect('/auth/profile')

  return (
    <CardWithHeader>
      <Suspense>
        <LoginForm />
      </Suspense>
      <LinkButton
        className="w-full"
        href="/auth/register"
        label="Crea una cuenta"
        variant="ghost"
      />
      <Divider text="o" />
      <Suspense>
        <SigninGoogle />
      </Suspense>
    </CardWithHeader>
  )
}
