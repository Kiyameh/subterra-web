import React from 'react'
import Divider from '@/components/displaying/divider'
import RegisterForm from '../../../components/account/register-form'
import GoogleButton from '../../../components/account/google-button'
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'
import SubterraLogo from '@/components/branding/subterra-logo'
import LinkButton from '@/components/navigation/link-button'

export default function RegisterPage() {
  return (
    <Card className="w-[420px] max-w-[90%]">
      <CardHeader>
        <SubterraLogo size="medium" />
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <Divider text="o" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <LinkButton
          className="w-full"
          href="/auth/login"
          label="Inicia sesión"
          variant="ghost"
        />
        <GoogleButton />
      </CardFooter>
    </Card>
  )
}
