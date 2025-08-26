import React from 'react'
import {auth} from '@/auth'
import {redirect} from 'next/navigation'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import InfoBox from '@/components/Molecules/boxes/info-box'
import CardTitle from '@/components/Molecules/boxes/card-title'
import RegisterForm from '@/components/Organisms/authentication/register-form'
import ResendSigninForm from '@/components/Organisms/authentication/resend-signin-form'

import {FaUserPlus} from 'react-icons/fa'

export default async function RegisterPage() {
  const user = (await auth())?.user

  // Si no hay usuario, mostrar formulario para enviar email de verificación:

  if (!user)
    return (
      <CardWithHeader
        cardSubHeader={<CardTitle title="Crea tu cuenta en Subterra" />}
      >
        <InfoBox
          title="Registrar cuenta"
          icon={<FaUserPlus />}
        >
          Introduce tu email para recibir un enlace de registro. Si ya está
          registrado, se iniciara la sesión y podras actualizar tus datos.
        </InfoBox>
        <ResendSigninForm emailCallbackUrl="/auth/register" />
      </CardWithHeader>
    )

  // Si hay usuario, y su perfil completo, reenviar a la página de perfil:

  if (user.name) redirect('/auth/profile')

  // Si hay usuario, y su perfil no está completo, mostrar formulario de registro:

  return (
    <BasicCard cardHeader={<CardTitle title="Completa tus datos" />}>
      <RegisterForm user={user} />
    </BasicCard>
  )
}
