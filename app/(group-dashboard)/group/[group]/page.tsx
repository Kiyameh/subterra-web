import NotFoundCard from '@/components/displaying/not-found-card'
import {connectToMongoDB} from '@/database/databaseConection'
import GroupModel, {Group} from '@/database/models/Group.model'

interface Props {
  params: Promise<{group: string}>
}

export default async function GroupLandingPage({params}: Props) {
  const groupName = (await params).group
  connectToMongoDB()
  const group: Group = await GroupModel.findOne({
    name: groupName,
  }).exec()

  if (!group) {
    return <NotFoundCard />
  }

  return (
    <section className="w-full h-full flex items-center justify-center">
      <h1>{`Bienvenido a la instancia ${group.fullname}`}</h1>
    </section>
  )
}
