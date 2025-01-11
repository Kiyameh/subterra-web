import React, {Suspense} from 'react'
import Divider from '@/components/_Atoms/boxes/divider'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import RegisterForm from '@/components/_authentication/register-form'
import LoginWrapper from '@/components/_authentication/login-wrapper'
import {Button} from '@/components/ui/button'
import SigninGoogle from '@/components/_authentication/signin-google'

export default function RegisterPage() {
  return (
    <CardWithHeader>
      <RegisterForm />
      <LoginWrapper>
        <Button
          className="w-full"
          variant="ghost"
        >
          Inicia sesión
        </Button>
      </LoginWrapper>
      <Divider text="o" />
      <Suspense>
        <SigninGoogle />
      </Suspense>
    </CardWithHeader>
  )
}
