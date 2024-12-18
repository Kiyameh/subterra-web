import {auth} from '@/auth'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import CaveEditionForm from '@/components/_Organisms/forms/cave-edition-form'
import PageContainer from '@/components/theming/page-container'
import {getPlainCave} from '@/database/services/cave.actions'
import {PlainCave} from '@/database/services/cave.actions'
import {LuPlusCircle} from 'react-icons/lu'

interface PageProps {
  params: Promise<{instance: string; document: string}>
}
export default async function CaveEditionPage({params}: PageProps) {
  // Obtener el id del documento
  const caveId = (await params).document

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Obtener la cavidad
  const cave = (await getPlainCave(caveId)).content as PlainCave | null

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
