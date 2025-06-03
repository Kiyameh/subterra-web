import React from 'react'
import Link from 'next/link'
import {auth} from '@/auth'

import {getOneGroup} from '@/database/services/Group/getOneGroup'
import {type GroupWithUsers} from '@/database/services/Group/getOneGroup'
import {getOnePlatform} from '@/database/services/Platform/getOnePlatform'
import {type PlatformObject} from '@/database/models/Platform.model'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import SquareButton from '@/components/Molecules/buttons/square-button'
import InfoBox from '@/components/Molecules/boxes/info-box'
import CardTitle from '@/components/Molecules/boxes/card-title'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import PendingRequestBanner from '@/components/Templates/groups/group-notification-area/pending-request-banner'
import GroupEditionForm from '@/components/Templates/groups/group-edition-form'

import {RiAddBoxLine} from 'react-icons/ri'
import {FiBox} from 'react-icons/fi'
import {MdModeEdit, MdPendingActions} from 'react-icons/md'
import {BiMessageDetail} from 'react-icons/bi'
import {FaInfoCircle} from 'react-icons/fa'
import {PiWarningBold} from 'react-icons/pi'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupAdminPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group as string

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as GroupWithUsers | null

  // Obtener la plataforma
  const subterra = (await getOnePlatform()).content as
    | PlatformObject
    | undefined

  // Peticiones de membresía pendientes
  const request = group?.member_requests

  // Número de instancias
  const numberOfInstances = group?.instances.length

  const instanceRequests = subterra?.instance_requests.filter(
    (request) => request.group === group?._id
  ).length

  if (!group) {
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
      />
    )
  }

  return (
    <>
      {request && request.length > 0 && (
        <PendingRequestBanner
          requests={request}
          groupId={group._id}
        />
      )}
      <BasicCard
        defaultWidth="xl"
        cardHeader={
          <CardTitle
            title="Instancias"
            icon={<FiBox />}
          />
        }
      >
        {group && subterra ? (
          <div className="flex flex-col gap-6 items-center justify-center">
            <InfoBox
              icon={<FaInfoCircle />}
              title="Instancias"
            >
              <p>● Puedes solicitar hasta tres instancias</p>
              <p>
                ● Tu grupo tiene{' '}
                <span className="text-info-foreground font-bold">
                  {numberOfInstances}
                </span>{' '}
                instancia
                <span>{numberOfInstances !== 1 && 's'}</span>
              </p>
              <p>
                ● Para eliminar una instancia o para cualquier consulta, ponte
                en contacto con la plataforma
              </p>
            </InfoBox>
            <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
              {instanceRequests ? (
                <SquareButton
                  text="Petición pendiente"
                  icon={<MdPendingActions />}
                  color="warning-foreground"
                  disabled
                />
              ) : numberOfInstances == 3 ? (
                <SquareButton
                  text="Máximo de instancias"
                  icon={<PiWarningBold />}
                  color="destructive-foreground"
                  disabled
                />
              ) : (
                <Link href={'admin/instance-request'}>
                  <SquareButton
                    text="Solicitar una instancia"
                    icon={<RiAddBoxLine />}
                    color="admin"
                  />
                </Link>
              )}

              <Link href={'/contact'}>
                <SquareButton
                  text="Contacto"
                  icon={<BiMessageDetail />}
                  color="admin"
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-warning-foreground p-6">
            <PiWarningBold /> Error al cargar los datos. Intentalo de nuevo más
            tarde.
          </div>
        )}
      </BasicCard>

      <BasicCard
        defaultWidth="xl"
        cardHeader={
          <CardTitle
            title="Editar información del grupo"
            icon={<MdModeEdit />}
          />
        }
      >
        {userId && (
          <GroupEditionForm
            initialData={group}
            commanderId={userId}
          />
        )}
      </BasicCard>
    </>
  )
}
