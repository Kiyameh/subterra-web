import {Suspense} from 'react'

import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import GroupInstancesBoard from '@/components/Templates/groups/group-instances-board/group-instances-board'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupInstancesPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  return (
    <Suspense fallback={<SkeletonCard className="w-full" />}>
      <GroupInstancesBoard groupName={groupName} />
    </Suspense>
  )
}
