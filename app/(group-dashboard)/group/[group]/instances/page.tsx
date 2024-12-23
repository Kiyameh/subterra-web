import {Suspense} from 'react'
import PageContainer from '@/components/theming/page-container'
import SkeletonCard from '@/components/_Molecules/cards/skeleton-card'
import GroupInstancesBoard from '@/components/group-instances-board/group-instances-board'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupInstancesPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={<SkeletonCard className="w-full" />}>
        <GroupInstancesBoard groupName={groupName} />
      </Suspense>
    </PageContainer>
  )
}
