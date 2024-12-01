import React from 'react'
import {auth} from '@/auth'
import {getOneGroup} from '@/database/services/group.services'
import {PopulatedGroup} from '@/database/models/Group.model'

import UnauthorizedCard from '@/components/displaying/401-unauthorized'
import NotFoundCard from '@/components/displaying/404-not-found'
import PendingRequestBanner from '@/components/boards/_interaction/pending-request-banner'
import {Session} from 'next-auth'
import MembersAdminCard from '@/components/boards/_cards/members-admin-card'
import GroupEditForm from '@/components/forms/group-edit-form'
import PageContainer from '@/components/containing/page-container'
import BasicCard from '@/components/containing/basic-card'

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

  // Validar roles de usuario:
  let isAdmin = false
  if (group && userId) {
    isAdmin = group.admin._id === userId
  }

  if (!userId || !isAdmin) {
    return (
      <PageContainer>
        <UnauthorizedCard />
      </PageContainer>
    )
  }

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
      <MembersAdminCard
        members={group.members}
        groupId={group._id}
      />
      <BasicCard defaultWidth="xl">
        <GroupEditForm
          initialData={group}
          editorId={userId}
        />
      </BasicCard>
    </PageContainer>
  )
}
