import {auth} from '@/auth'
import UnauthorizedCard from '@/components/displaying/401-unauthorized'
import NotFoundCard from '@/components/displaying/404-not-found'
import {PopulatedGroup} from '@/database/models/Group.model'
import {getOneGroup} from '@/database/services/group.services'
import {Session} from 'next-auth'
import InstanceCard from '@/components/boards/_cards/instance-card'
import MembersCard from '@/components/boards/_cards/members-card'

import {getSomeInstances} from '@/database/services/instance.services'
import {PopulatedInstance} from '@/database/models/Instance.model'
import PageContainer from '@/components/containing/page-container'

interface Props {
  params: Promise<{group: string}>
}

export default async function GroupMembersPage({params}: Props) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

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

  // Obtener las instancias pobladas
  const instancesIds = group.instances.map((instance) => instance._id)
  const answer = await getSomeInstances(instancesIds)
  const populatedInstances = answer.content as PopulatedInstance[]

  // Obtener el usuario actual
  const session: Session | null = await auth()
  const userId = session?.user._id

  // Comprobar si el usuario actual es miembro del grupo
  let isMember = false
  if (group && userId) {
    isMember = group.members.some(
      (member) => member._id.toString() === userId.toString()
    )
  }

  if (!isMember) {
    return (
      <PageContainer>
        <UnauthorizedCard />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {populatedInstances.map((instance) => (
        <InstanceCard
          key={instance._id}
          instance={instance}
        />
      ))}
      <MembersCard members={group.members} />
    </PageContainer>
  )
}
