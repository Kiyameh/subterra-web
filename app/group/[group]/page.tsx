import {Suspense} from 'react'

import HeaderBox from '@/components/Molecules/boxes/header-box'
import ImageCard from '@/components/Organisms/containers/image-card'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import SkeletonHeader from '@/components/Organisms/containers/skelenton-header'
import ContactCard from '@/components/Templates/groups/group-details-board/contact-card'
import GroupInfoCard from '@/components/Templates/groups/group-details-board/group-info-card'
import GroupNotificationArea from '@/components/Templates/groups/group-notification-area/group-notification-area'
import GroupHeader from '@/components/Templates/groups/group-details-board/group-header'
import GroupDescriptionCard from '@/components/Templates/groups/group-details-board/group-description-card'
import GroupInstancesBox from '@/components/Templates/groups/group-details-board/group-instances-box'

import {FiBox} from 'react-icons/fi'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupLandingPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName: string = (await params).group

  return (
    <>
      <Suspense fallback={<div></div>}>
        <GroupNotificationArea groupName={groupName} />
      </Suspense>

      <ImageCard />

      <div className="flex gap-4 flex-wrap justify-center">
        <Suspense fallback={<SkeletonHeader />}>
          <GroupHeader groupName={groupName} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <GroupInfoCard groupName={groupName} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <ContactCard groupName={groupName} />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <GroupDescriptionCard groupName={groupName} />
        </Suspense>

        <HeaderBox
          text={`Instancias del grupo`}
          icon={<FiBox />}
        />

        <Suspense fallback={<SkeletonCard />}>
          <GroupInstancesBox groupName={groupName} />
        </Suspense>
      </div>
    </>
  )
}
