import {auth} from '@/auth'
import InstanceRequestForm from '@/components/_Organisms/forms/instance-request-form'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import PageContainer from '@/components/theming/page-container'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'

import {BiSolidMessage} from 'react-icons/bi'
import {getOneGroupIndex, GroupIndex} from '@/database/services/group.actions'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function InstanceRequestPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el Índice del grupo
  const groupIndex = (await getOneGroupIndex(groupName))
    .content as GroupIndex | null

  // Obtener el usuario
  const user = (await auth())?.user

  return (
    <PageContainer>
      {user && groupIndex ? (
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
            groupIndex={groupIndex}
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
