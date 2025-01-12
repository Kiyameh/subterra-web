import React from 'react'
import {auth} from '@/auth'
import ResetPassForm from '@/components/_authentication/reset-pass-form'
import {redirect} from 'next/navigation'
import BasicCard from '@/components/_Atoms/boxes/basic-card'

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
