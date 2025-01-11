import React, {Suspense} from 'react'
import Divider from '@/components/_Atoms/boxes/divider'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import LoginForm from '@/components/_authentication/login-form'
import SigninGoogle from '@/components/_authentication/signin-google'

export default function LoginPage() {
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
