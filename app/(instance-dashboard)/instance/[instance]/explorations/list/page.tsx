import {auth} from '@/auth'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import AllExplorationTable from '@/components/_Organisms/tables/all-explorations-table'
import PageContainer from '@/components/theming/page-container'
import {
  ExplorationIndex,
  getExplorationsIndex,
} from '@/database/services/exploration.actions'
import {checkIsEditor} from '@/database/services/instance.services'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function ExplorationListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el indice de cuevas
  const explorationsIndex = (await getExplorationsIndex(instanceName))
    .content as ExplorationIndex[] | undefined

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = (await checkIsEditor(userId, instanceName)).ok as boolean

  if (!explorationsIndex)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Intentalo de nuevo más tarde"
      />
    )

  return (
    <PageContainer className="justify-start">
      <AllExplorationTable
        explorationsIndex={explorationsIndex}
        instanceName={instanceName}
        isEditor={isEditor}
      />
    </PageContainer>
  )
}
