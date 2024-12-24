import {auth} from '@/auth'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import InstanceEditionForm from '@/components/_Organisms/forms/instance-edition-form'
import PageContainer from '@/components/theming/page-container'
import {InstanceWithUsers} from '@/database/services/instance.actions'
import {getOneInstance} from '@/database/services/instance.actions'
import {MdModeEdit} from 'react-icons/md'

interface PageProps {
  params: Promise<{instance: string}>
}

export default async function InstanceAdminPage({params}: PageProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance as string

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as InstanceWithUsers | null

  if (!instance) {
    return (
      <PageContainer>
        <NotFoundCard
          title="Algo ha ido mal"
          text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
        />
      </PageContainer>
    )
  }
  return (
    <PageContainer>
      <BasicCard
        defaultWidth="xl"
        cardHeader={
          <CardTitle
            title="Editar información de la instancia"
            icon={<MdModeEdit />}
          />
        }
      >
        {userId && (
          <InstanceEditionForm
            initialData={instance}
            commanderId={userId}
          />
        )}
      </BasicCard>
    </PageContainer>
  )
}
