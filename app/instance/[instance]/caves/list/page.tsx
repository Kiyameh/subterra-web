import { Suspense } from 'react'

import { getOneInstance } from '@/database/services/Instance/getOneInstance'
import { type InstanceWithUsers } from '@/database/services/Instance/getSomeInstances'

import SkeletonCard from '@/components/Organisms/containers/skeleton-card'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import CaveTableLoader from '@/components/Templates/documents/list-view/cave-table-loader'

interface PageProps {
  params: Promise<{ instance: string }>
}

export default async function CaveListPage({ params }: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener id de la instancia y del maestro, si existe:
  const instance = (await getOneInstance(instanceName)).content as
    | InstanceWithUsers
    | undefined

  if (!instance) return <NotFoundCard title="Instancia no encontrada" />

  return (
    <Suspense fallback={<SkeletonCard className="w-full" />}>
      <CaveTableLoader
        instanceName={instanceName}
      />
    </Suspense>
  )
}
