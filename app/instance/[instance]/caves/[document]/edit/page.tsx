import {auth} from '@/auth'

import {getPlainCave} from '@/database/services/Cave/getPlainCave'
import {type PlainCave} from '@/database/services/Cave/getPlainCave'
import {getSystemIndex} from '@/database/services/System/getSystemIndex'
import {type SystemIndex} from '@/database/services/System/getSystemIndex'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import CaveEditionForm from '@/components/Templates/documents/edition-forms/cave-edition-form'

import {LuPlusCircle} from 'react-icons/lu'

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
      <NotFoundCard
        title="Algo ha ido mal al cargar los datos"
        text="Intentalo de nuevo más tarde"
      />
    )
  }

  return (
    <>
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
    </>
  )
}
