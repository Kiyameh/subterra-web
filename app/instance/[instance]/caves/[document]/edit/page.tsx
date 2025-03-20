import {auth} from '@/auth'

import {getPlainCave, PlainCave} from '@/database/services/Cave/getPlainCave'
import {SystemIndex} from '@/database/services/System/getSystemIndex'
import {getSystemIndex} from '@/database/services/System/getSystemIndex'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'

import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import PageContainer from '@/components/Organisms/theme/page-container'

import {LuPlusCircle} from 'react-icons/lu'
import CaveEditionForm from '@/components/Templates/caves/edition/cave-edition-form'

interface PageProps {
  params: Promise<{instance: string; document: string}>
}
export default async function CaveEditionPage({params}: PageProps) {
  // Obtener el id del documento
  const caveId = (await params).document
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance
  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Obtener la cavidad
  const cave = (await getPlainCave(caveId)).content as PlainCave | null
  // Obtener el índice del sistema
  const systemIndex = (await getSystemIndex(instanceName)).content as
    | SystemIndex[]
    | undefined

  if (!cave) {
    return (
      <PageContainer>
        <NotFoundCard
          title="Algo ha ido mal al cargar los datos"
          text="Intentalo de nuevo más tarde"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer className="justify-start">
      {userId ? (
        <BasicCard
          defaultWidth="xl"
          cardHeader={
            <CardTitle
              title={`Editar ${cave.name}`}
              icon={<LuPlusCircle />}
            />
          }
        >
          <CaveEditionForm
            commanderId={userId}
            cave={cave}
            systemIndex={systemIndex}
          />
        </BasicCard>
      ) : (
        <NotFoundCard
          title="Algo ha ido mal"
          text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
        />
      )}
    </PageContainer>
  )
}
