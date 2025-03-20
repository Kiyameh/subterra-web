import {Suspense} from 'react'
import SkeletonCard from '@/components/cards/skeleton-card'
import PageContainer from '@/components/theming/page-container'

import NotFoundCard from '@/components/cards/404-not-found'
import CaveTableLoader from '@/components/_document-pages/cave-list-board/cave-table-loader'
import {getOneInstance} from '@/database/services/Instance/getOneInstance'
import {InstanceWithUsers} from '@/database/services/Instance/getSomeInstances'

interface PageProps {
  params: Promise<{instance: string}>
}

export default async function CaveListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener id de la instancia y del maestro, si existe:
  const instance = (await getOneInstance(instanceName)).content as
    | InstanceWithUsers
    | undefined
  const instanceId = instance?._id.toString()
  const masterInstanceId = instance?.master_instance?.toString()

  if (!instanceId)
    return (
      <PageContainer>
        <NotFoundCard title="Instancia no encontrada" />
      </PageContainer>
    )

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={<SkeletonCard className="w-full" />}>
        <CaveTableLoader
          instanceName={instanceName}
          instanceId={instanceId}
          masterInstanceId={masterInstanceId}
        />
      </Suspense>
    </PageContainer>
  )
}
