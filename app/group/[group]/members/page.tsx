import {Suspense} from 'react'

import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import GroupMembersBoard from '@/components/Templates/groups/group-members-board/group-members-board'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupMembersPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  return (
    <Suspense fallback={<SkeletonCard className="w-full" />}>
      <GroupMembersBoard groupName={groupName} />
    </Suspense>
  )
}
