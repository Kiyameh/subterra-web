import React, {Suspense} from 'react'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import ProfilePanel from '@/components/_Molecules/auth/profile-panel'

export default async function ProfilePage() {
  return (
    <CardWithHeader cardSubHeader="Perfil">
      <Suspense fallback={<SkeletonCard defaultWidth="sm" />}>
        <ProfilePanel />
      </Suspense>
    </CardWithHeader>
  )
}
