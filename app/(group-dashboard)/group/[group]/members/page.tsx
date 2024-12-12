import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import {PopulatedGroup} from '@/database/models/Group.model'
import {checkIsAdmin, getOneGroup} from '@/database/services/group.services'
import MembersTable, {
  MembersTableRow,
} from '@/components/_Organisms/tables/members-table'

import PageContainer from '@/components/theming/page-container'
import {auth} from '@/auth'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupMembersPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isAdmin = (await checkIsAdmin(groupName, userId)).ok as boolean
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

  // Generar las filas de la tabla

  const rows: MembersTableRow[] = group.members.map((member) => ({
    _id: member._id,
    name: member.name,
    image: member.image,
    fullname: member.fullname,
    email: member.email,
    isAdmin: group.admin._id.toString() === member._id,
  }))

  return (
    <PageContainer className="justify-start">
      <MembersTable
        groupId={group._id}
        rows={rows}
        adminActions={isAdmin}
      />
    </PageContainer>
  )
}
