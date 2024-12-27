import React from 'react'
import Divider from '@/components/_Atoms/boxes/divider'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import GoogleButton from '@/components/_Atoms/buttons/google-button'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import RegisterForm from '@/components/_Organisms/forms/register-form'

export default function RegisterPage() {
  return (
    <CardWithHeader>
      <RegisterForm />
      <LinkButton
        className="w-full"
        href="/auth/login"
        label="Inicia sesión"
        variant="ghost"
      />
      <Divider text="o" />

      <GoogleButton />
    </CardWithHeader>
  )
}
