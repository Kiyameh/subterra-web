import React from 'react'
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'
import LoginForm from '@/components/forms/login-form'
import GoogleButton from '@/components/account/google-button'
import Divider from '@/components/displaying/divider'
import SubterraLogo from '@/components/branding/subterra-logo'
import LinkButton from '@/components/navigation/link-button'

export default function LoginPage() {
  return (
    <Card className="w-[420px] max-w-[90%]">
      <CardHeader>
        <SubterraLogo size="medium" />
      </CardHeader>
      <CardContent>
        <LoginForm />
        <Divider text="o" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <LinkButton
          className="w-full"
          href="/auth/register"
          label="Crea una cuenta"
          variant="ghost"
        />
        <GoogleButton />
      </CardFooter>
    </Card>
  )
}
