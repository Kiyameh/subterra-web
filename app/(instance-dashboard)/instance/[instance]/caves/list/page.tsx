import {auth} from '@/auth'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import AllCavesTable from '@/components/_Organisms/tables/all-caves-table'
import PageContainer from '@/components/theming/page-container'
import {CaveIndex} from '@/database/models/Cave.model'
import {getCaveIndex} from '@/database/services/cave.services'
import {checkIsEditor} from '@/database/services/instance.services'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function CaveListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el indice de cuevas
  const cavesIndex = (await getCaveIndex(instanceName)).content as
    | CaveIndex[]
    | undefined

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = (await checkIsEditor(userId, instanceName)).ok as boolean

  if (!cavesIndex)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Intentalo de nuevo más tarde"
      />
    )

  return (
    <PageContainer className="justify-start">
      <AllCavesTable
        cavesIndex={cavesIndex}
        instanceName={instanceName}
        isEditor={isEditor}
      />
    </PageContainer>
  )
}
