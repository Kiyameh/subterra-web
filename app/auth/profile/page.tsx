import React, {Suspense} from 'react'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import SkeletonCard from '@/components/cards/skeleton-card'
import ProfilePanel from '@/components/_authentication/profile-panel'
import LinkButton from '@/components/_Atoms/buttons/link-button'

export default async function ProfilePage() {
  return (
    <CardWithHeader>
      <Suspense fallback={<SkeletonCard defaultWidth="sm" />}>
        <ProfilePanel />
      </Suspense>
      <LinkButton
        href="/auth/profile/edit"
        variant="secondary"
        label="Editar perfil"
      />
    </CardWithHeader>
  )
}
