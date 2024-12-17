import {auth} from '@/auth'

import {CaveIndex} from '@/database/models/Cave.model'
import {getCaveIndex} from '@/database/services/cave.services'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import SystemCreationForm from '@/components/_Organisms/forms/system-creation-form'
import PageContainer from '@/components/theming/page-container'

import {RiApps2AddLine} from 'react-icons/ri'

interface PageProps {
  params: Promise<{instance: string}>
}
export default async function SystemCreationPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Obtener el índice de cavidades
  const cavesIndex = (await getCaveIndex(instanceName)).content as
    | CaveIndex[]
    | undefined

  return (
    <PageContainer className="justify-start">
      {userId ? (
        <BasicCard
          defaultWidth="xl"
          cardHeader={
            <CardTitle
              title={`Crear sistema en ${instanceName}`}
              icon={<RiApps2AddLine />}
            />
          }
        >
          <CollapsibleBox
            title={`Sistemas`}
            color="info"
          >
            <p>
              ● Los sistemas representan un complejo karstico y uno o varios
              accesos al mismo.
            </p>
            <p>
              ● Cada cavidad puede pertenecer a un solo sistema, pero un sistema
              puede tener varias cavidades.
            </p>
            <p>
              ● Revisa los datos con atención antes de enviar el formulario. El
              sistema se añadira a la instancia actual.
            </p>
          </CollapsibleBox>
          <SystemCreationForm
            instanceName={instanceName}
            commanderId={userId}
            cavesIndex={cavesIndex}
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
