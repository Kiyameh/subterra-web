import {Suspense} from 'react'

import ContactCard from '@/components/_Molecules/cards/group-dashboard/contact-card'
import GroupInfoCard from '@/components/_Molecules/cards/group-dashboard/group-info-card'
import ImageCard from '@/components/_Molecules/cards/image-card'
import PageContainer from '@/components/theming/page-container'
import HeaderBox from '@/components/_Atoms/boxes/header-box'
import GroupNotificationArea from '@/components/_Molecules/interactives/group-notification-area/group-notification-area'
import GroupHeader from '@/components/_Molecules/cards/group-dashboard/group-header'
import SkeletonHeader from '@/components/_Molecules/cards/skelenton-header'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import GroupDescriptionCard from '@/components/_Molecules/cards/group-dashboard/group-description-card'
import GroupInstancesBox from '@/components/_Molecules/cards/group-dashboard/group-instances-box'

import {FiBox} from 'react-icons/fi'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupLandingPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName: string = (await params).group

  return (
    <PageContainer className="justify-start">
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
    </PageContainer>
  )
}
