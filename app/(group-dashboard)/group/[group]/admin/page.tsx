import React from 'react'
import {auth} from '@/auth'
import {getOneGroup} from '@/database/services/group.services'
import {PopulatedGroup} from '@/database/models/Group.model'

import NotFoundCard from '@/components/displaying/404-not-found'
import PendingRequestBanner from '@/components/boards/_interaction/pending-request-banner'
import {Session} from 'next-auth'
import MembersAdminCard from '@/components/boards/_cards/members-admin-card'
import GroupEditForm from '@/components/forms/group-edit-form'
import PageContainer from '@/components/containing/page-container'
import BasicCard from '@/components/containing/basic-card'
import LinkButton from '@/components/navigation/link-button'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupAdminPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Peticiones de membresía pendientes
  const request = group?.member_requests

  // Obtener la sesión de usuario
  const session: Session | null = await auth()
  const userId = session?.user?._id

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
        {group.instances?.map((instance) => (
          <div key={instance._id}>
            <LinkButton
              href={`/instance/${instance.name}`}
              label={instance.name}
            />
          </div>
        ))}
        <LinkButton
          label="Solitica una nueva instancia"
          href={'admin/instance-request'}
        />
      </BasicCard>
      <MembersAdminCard
        members={group.members}
        groupId={group._id}
      />
      <BasicCard defaultWidth="xl">
        {userId && (
          <GroupEditForm
            initialData={group}
            commanderId={userId}
          />
        )}
      </BasicCard>
    </PageContainer>
  )
}
