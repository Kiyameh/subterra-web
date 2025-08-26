import {auth} from '@/auth'

import {getOneGroupIndex} from '@/database/services/Group/getOneGrupoIndex'
import {type GroupIndex} from '@/database/services/Group/getOneGrupoIndex'
import {getInstancesIndex} from '@/database/services/Instance/getInstancesIndex'
import {type InstanceIndex} from '@/database/services/Instance/getInstancesIndex'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import CollapsibleBox from '@/components/Molecules/boxes/collapsible-box'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import InstanceRequestForm from '@/components/Templates/groups/instance-request-form'

import {BiSolidMessage} from 'react-icons/bi'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function InstanceRequestPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el Índice del grupo
  const groupIndex = (await getOneGroupIndex(groupName))
    .content as GroupIndex | null

  // Obtener el Índice de instancias

  const instanceIndex = (await getInstancesIndex()).content as
    | InstanceIndex[]
    | null

  // Obtener el usuario
  const user = (await auth())?.user

  return (
    <>
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
            instanceIndex={instanceIndex}
          />
        </CardWithHeader>
      ) : (
        <NotFoundCard
          title="Algo ha ido mal"
          text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
        />
      )}
    </>
  )
}
