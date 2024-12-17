import {auth} from '@/auth'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import AllSystemTable from '@/components/_Organisms/tables/all-systems-table'
import PageContainer from '@/components/theming/page-container'
import {SystemIndex} from '@/database/models/System.model'
import {checkIsEditor} from '@/database/services/instance.services'
import {getSystemIndex} from '@/database/services/system.services'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function SystemListPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el indice de cuevas
  const systemIndex = (await getSystemIndex(instanceName)).content as
    | SystemIndex[]
    | undefined

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = (await checkIsEditor(userId, instanceName)).ok as boolean

  if (!systemIndex)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Intentalo de nuevo más tarde"
      />
    )

  return (
    <PageContainer className="justify-start">
      <AllSystemTable
        systemIndex={systemIndex}
        instanceName={instanceName}
        isEditor={isEditor}
      />
    </PageContainer>
  )
}
