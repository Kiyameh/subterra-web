import React from 'react'
import {auth} from '@/auth'
import {redirect} from 'next/navigation'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import ResetPassForm from '@/components/Organisms/authentication/reset-pass-form'

export default async function ResetPasswordPage() {
  // 1. Obtener datos del usuario
  // Obtener el id del usuario
  const user = (await auth())?.user

  if (!user) redirect('/auth/login')

  return (
    <BasicCard cardHeader="Cambiar contraseña">
      <ResetPassForm user={user} />
    </BasicCard>
  )
}
