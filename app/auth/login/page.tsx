import React, { Suspense } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import SigninGoogle from '@/components/Organisms/authentication/signin-google'
import CardTitle from '@/components/Molecules/boxes/card-title'

export default async function LoginPage() {
  const user = (await auth())?.user

  // Si hay usuario, reenviar a la página de perfil:

  if (user?.name) redirect('/auth/profile')

  return (
    <CardWithHeader cardSubHeader={<CardTitle title="Inicia sesión" subtitle='Inicia sesión con tu cuenta de Google. Si no tienes un perfil, se creará uno automáticamente.' />}>

      {/* Login con pass y email deshabilitado temporalmente */}
      {/* <Suspense>
        <LoginForm />
      </Suspense> 
      <LinkButton
        className="w-full"
        href="/auth/register"
        label="Crea una cuenta"
        variant="ghost"
      />
      <Divider text="o" />*/}

      <Suspense>
        <SigninGoogle />
      </Suspense>
    </CardWithHeader>
  )
}
