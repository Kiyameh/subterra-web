import React from 'react'
import Divider from '@/components/displaying/divider'
import LinkButton from '@/components/navigation/link-button'
import RegisterForm from '@/components/forms/register-form'
import GoogleButton from '@/components/account/google-button'
import CardWithHeader from '@/components/containing/card-with-header'
import PageContainer from '@/components/containing/page-container'

export default function RegisterPage() {
  return (
    <PageContainer className="justify-center">
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
    </PageContainer>
  )
}
