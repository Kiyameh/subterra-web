import React from 'react'
import {auth} from '@/auth'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import ResetPassForm from '@/components/_authentication/reset-pass-form'
import {redirect} from 'next/navigation'

export default async function ResetPasswordPage() {
  // 1. Obtener datos del usuario
  // Obtener el id del usuario
  const user = (await auth())?.user

  if (!user) redirect('/auth/login')

  return (
    <CardWithHeader cardSubHeader="Cambiar contraseña">
      <ResetPassForm user={user} />
    </CardWithHeader>
  )
}
