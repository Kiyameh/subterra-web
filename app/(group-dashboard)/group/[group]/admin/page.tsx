import React from 'react'
import {auth} from '@/auth'
import {getOneGroup} from '@/database/services/group.services'
import {PopulatedGroup} from '@/database/models/Group.model'

import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import PendingRequestBanner from '@/components/_Molecules/interactives/pending-request-banner'
import PageContainer from '@/components/theming/page-container'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import GroupEditionForm from '@/components/_Organisms/forms/group-edition-form'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupAdminPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group as string

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

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
        cardHeader="Instancias"
      >
        <p>TODO: PANEL DE INSTANCIAS</p>
        <LinkButton
          label="Solitica una nueva instancia"
          href={'admin/instance-request'}
        />
      </BasicCard>

      <BasicCard defaultWidth="xl">
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
