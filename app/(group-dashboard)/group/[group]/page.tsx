import NotFoundCard from '@/components/displaying/404-not-found'
import {PopulatedGroup} from '@/database/models/Group.model'
import {getOneGroup} from '@/database/services/group.services'

interface Props {
  params: Promise<{group: string}>
}

export default async function GroupLandingPage({params}: Props) {
  const groupName = (await params).group

  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  if (!group) {
    return <NotFoundCard />
  }

  return (
    <section className="w-full h-full flex items-center justify-center">
      <h1>{`Bienvenido a la instancia ${group.fullname}`}</h1>
    </section>
  )
}
