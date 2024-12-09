import {auth} from '@/auth'
import CardWithHeader from '@/components/containing/card-with-header'
import CollapsibleBox from '@/components/containing/collapsible-box'
import PageContainer from '@/components/containing/page-container'
import NotFoundCard from '@/components/displaying/404-not-found'
import InstanceRequestForm from '@/components/forms/instance-request-form'
import {PopulatedGroup} from '@/database/models/Group.model'
import {getOneGroup} from '@/database/services/group.services'
import {BiSolidMessage} from 'react-icons/bi'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function InstanceRequestPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener el usuario
  const session = await auth()
  const user = session?.user

  return (
    <PageContainer>
      {user && group ? (
        <CardWithHeader
          defaultWidth="xl"
          cardSubHeader={
            <CollapsibleBox
              title="Solicitar una instancia"
              icon={<BiSolidMessage />}
              color="info"
            >
              <p>
                ● Las instancias en subterra sirven para almacenar datos de
                cavidades y exploraciones.
              </p>
              <p>
                ● Cada grupo puede tener un máximo de tres instancias, y se
                pueden solicitar a traves del siguiente formulario
              </p>
              <p>
                ● El staff de subterra respondera lo antes posible a tu
                solicitud.
              </p>
            </CollapsibleBox>
          }
        >
          <InstanceRequestForm
            commander={user}
            group={group}
          />
        </CardWithHeader>
      ) : (
        <NotFoundCard
          title="Algo ha ido mal"
          text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
        />
      )}
    </PageContainer>
  )
}
