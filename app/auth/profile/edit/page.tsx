import React from 'react'
import {auth} from '@/auth'

import {getPopulatedUser} from '@/database/services/User/getPopulatedUser'
import {type PopulatedUser} from '@/database/services/User/getPopulatedUser'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import ProfileEditForm from '@/components/Organisms/authentication/profile-edit-form'
import UnauthorizedCard from '@/components/Organisms/containers/401-unauthorized'

export default async function EditProfilePage() {
  const userId = (await auth())?.user._id
  const user: PopulatedUser | undefined = await getPopulatedUser(userId)

  if (!user)
    return (
      <UnauthorizedCard
        text="Inicia sesión para acceder a esta página"
        redirectLabel="Iniciar sesión"
        redirectUrl="/auth/login"
      />
    )

  const {name, fullname, image, email} = user

  return (
    <CardWithHeader cardSubHeader="Editar perfil">
      <ProfileEditForm user={{name, fullname, image, email}} />
    </CardWithHeader>
  )
}
