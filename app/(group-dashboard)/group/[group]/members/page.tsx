import NotFoundCard from '@/components/displaying/404-not-found'
import {PopulatedGroup} from '@/database/models/Group.model'
import {getOneGroup} from '@/database/services/group.services'
import MembersTable, {
  MembersTableRows,
} from '@/components/boards/_tables/members-table'

import PageContainer from '@/components/containing/page-container'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupMembersPage({params}: PageProps) {
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

  // Generar las filas de la tabla
  const rows: MembersTableRows[] = group.members.map((member) => ({
    user: {name: member.name, image: member.image},
    fullname: member.fullname,
    email: member.email,
    isAdmin: group.admin._id.toString() === member._id,
  }))

  return (
    <PageContainer className="justify-start">
      <MembersTable rows={rows} />
    </PageContainer>
  )
}
