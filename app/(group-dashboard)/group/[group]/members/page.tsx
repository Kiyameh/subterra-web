import {Suspense} from 'react'
import PageContainer from '@/components/theming/page-container'
import SkeletonCard from '@/components/cards/skeleton-card'
import GroupMembersBoard from '@/components/_group-dashboard/group-members-board/group-members-board'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupMembersPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={<SkeletonCard className="w-full" />}>
        <GroupMembersBoard groupName={groupName} />
      </Suspense>
    </PageContainer>
  )
}
