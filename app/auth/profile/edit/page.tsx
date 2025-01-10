import React from 'react'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import {auth} from '@/auth'
import ProfileEditForm from '@/components/_Organisms/forms/profile-edit-form'
import ErrorCard from '@/components/_Molecules/cards/500-error'
import {FullUser, getFullUser} from '@/database/services/user.actions'

export default async function EditProfilePage() {
  const userId = (await auth())?.user._id
  const user: FullUser | undefined = await getFullUser(userId)

  if (!user) return <ErrorCard />
  const {name, fullname, image, email} = user

  return (
    <CardWithHeader cardSubHeader="Editar perfil">
      <ProfileEditForm user={{name, fullname, image, email}} />
    </CardWithHeader>
  )
}
