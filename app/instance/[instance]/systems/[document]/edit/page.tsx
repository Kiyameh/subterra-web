import {auth} from '@/auth'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import SystemEditionForm from '@/components/Templates/systems/edition/system-edition-form'
import PageContainer from '@/components/Organisms/theme/page-container'

import {LuPlusCircle} from 'react-icons/lu'
import {PlainSystem} from '@/database/services/System/getPlainSystem'
import {getPlainSystem} from '@/database/services/System/getPlainSystem'

interface PageProps {
  params: Promise<{instance: string; document: string}>
}
export default async function SystemEditionPage({params}: PageProps) {
  // Obtener el id del documento
  const systemId = (await params).document

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Obtener la cavidad
  const system = (await getPlainSystem(systemId)).content as PlainSystem | null

  if (!system) {
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
              title={`Editar ${system.name}`}
              icon={<LuPlusCircle />}
            />
          }
        >
          <SystemEditionForm
            commanderId={userId}
            system={system}
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
