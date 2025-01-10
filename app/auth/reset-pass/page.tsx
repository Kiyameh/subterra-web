import React from 'react'
import {auth} from '@/auth'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import ResetPassForm from '@/components/_Organisms/forms/reset-pass-form'
import ErrorCard from '@/components/_Molecules/cards/500-error'

export default async function ResetPasswordPage() {
  // 1. Obtener datos del usuario
  // Obtener el id del usuario
  const user = (await auth())?.user

  if (!user) return <ErrorCard />

  return (
    <CardWithHeader cardSubHeader="Cambiar contraseña">
      <ResetPassForm user={user} />
    </CardWithHeader>
  )
}
