import React from 'react'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import {CardTitle} from '@/components/Atoms/card'
import ResendSigninForm from '@/components/Organisms/authentication/resend-signin-form'
import InfoBox from '@/components/Molecules/boxes/info-box'
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
