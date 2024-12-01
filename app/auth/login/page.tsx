import React from 'react'
import LoginForm from '@/components/forms/login-form'
import GoogleButton from '@/components/account/google-button'
import Divider from '@/components/displaying/divider'
import LinkButton from '@/components/navigation/link-button'
import CardWithHeader from '@/components/containing/card-with-header'
import PageContainer from '@/components/containing/page-container'

export default function LoginPage() {
  return (
    <PageContainer className="justify-center">
      <CardWithHeader>
        <LoginForm />
        <LinkButton
          className="w-full"
          href="/auth/register"
          label="Crea una cuenta"
          variant="ghost"
        />
        <Divider text="o" />
        <GoogleButton />
      </CardWithHeader>
    </PageContainer>
  )
}
