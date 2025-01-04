import React from 'react'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import {auth} from '@/auth'

export default async function EditProfilePage() {
  // 1. Obtener datos del usuario
  // Obtener el id del usuario
  const user = (await auth())?.user

  return (
    <CardWithHeader cardSubHeader="Editar perfil">
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </CardWithHeader>
  )
}
