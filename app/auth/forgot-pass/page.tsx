import React from 'react'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import {CardTitle} from '@/components/ui/card'
import ResendSigninForm from '@/components/_authentication/resend-signin-form'
import InfoBox from '@/components/_Atoms/boxes/info-box'
import {MdPassword} from 'react-icons/md'

export default function ForgotPasswordPage() {
  return (
    <CardWithHeader
      cardSubHeader={<CardTitle title="Reinicia tu contraseña" />}
    >
      <InfoBox
        title="Email de recuperación"
        icon={<MdPassword />}
      >
        Introduce tu email. Si esta registrado, recibirás un enlace para
        reiniciar tu contraseña.
      </InfoBox>

      <ResendSigninForm emailCallbackUrl="/auth/reset-pass" />
    </CardWithHeader>
  )
}
