import {Suspense} from 'react'
import PageContainer from '@/components/Organisms/theme/page-container'
import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import GroupInstancesBoard from '@/components/Templates/groups/group-instances-board/group-instances-board'

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
