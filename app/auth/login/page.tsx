import React from 'react'
import GoogleButton from '@/components/account/google-button'
import Divider from '@/components/_Atoms/boxes/divider'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import PageContainer from '@/components/theming/page-container'
import LoginForm from '@/components/_Organisms/forms/login-form'

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
