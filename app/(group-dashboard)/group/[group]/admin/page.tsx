import React from 'react'
import Link from 'next/link'
import {auth} from '@/auth'
import {getOneGroup, GroupWithUsers} from '@/database/services/group.actions'

import NotFoundCard from '@/components/cards/404-not-found'
import PendingRequestBanner from '@/components/_group-dashboard/pending-request-banner'
import PageContainer from '@/components/theming/page-container'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import GroupEditionForm from '@/components/_group-dashboard/group-edition-form'
import SquareButton from '@/components/_Atoms/buttons/square-button'
import InfoBox from '@/components/_Atoms/boxes/info-box'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {RiAddBoxLine} from 'react-icons/ri'
import {FiBox} from 'react-icons/fi'
import {MdModeEdit} from 'react-icons/md'

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

  // Peticiones de membresía pendientes
  const request = group?.member_requests

  if (!group) {
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
        <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
          {group.instances.length < 3 && (
            <Link href={'admin/instance-request'}>
              <SquareButton
                text="Solicitar una instancia"
                icon={<RiAddBoxLine />}
                color="admin"
              />
            </Link>
          )}
          <div>
            <InfoBox
              title={
                <span>
                  Tu grupo tiene
                  <span className="font-semibold text-info-foreground px-1">
                    {group.instances.length}
                  </span>
                  instancias
                </span>
              }
            >
              {group.instances.length === 3
                ? 'Has alcanzado el límite de instancias, elimina una para solicitar otra'
                : 'Puedes solicitar hasta tres instancias'}
            </InfoBox>
          </div>
        </div>
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
    </PageContainer>
  )
}
