import {Suspense} from 'react'
import SkeletonCard from '@/components/cards/skeleton-card'
import PageContainer from '@/components/theming/page-container'
import {CaveIndex, getCaveIndex} from '@/database/services/cave.actions'
import {auth} from '@/auth'
import {checkIsEditor} from '@/database/services/instance.actions'
import NotFoundCard from '@/components/cards/404-not-found'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'

import {FaRegCircle} from 'react-icons/fa6'
import {CavesTableLayout} from '@/components/_document-pages/cave-list-board/caves-table-layout'

interface PageProps {
  params: Promise<{instance: string}>
}

export default async function CaveListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  return (
    <PageContainer className="justify-start">
      <Suspense fallback={<SkeletonCard className="w-full" />}>
        <CaveTableLoader instanceName={instanceName} />
      </Suspense>
    </PageContainer>
  )
}

async function CaveTableLoader({instanceName}: {instanceName: string}) {
  // Obtener el indice de cuevas
  const cavesIndex = (await getCaveIndex(instanceName)).content as
    | CaveIndex[]
    | undefined

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instanceName)

  if (!cavesIndex)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Intentalo de nuevo más tarde"
      />
    )
  return (
    <BasicCard
      className="w-full"
      cardHeader={
        <CardTitle
          title={`Cavidades de ${instanceName}`}
          icon={<FaRegCircle />}
        />
      }
    >
      <CavesTableLayout
        data={cavesIndex}
        instanceName={instanceName}
        isEditor={isEditor}
      />
    </BasicCard>
  )
}
