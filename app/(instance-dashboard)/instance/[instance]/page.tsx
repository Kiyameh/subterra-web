import NotFoundCard from '@/components/displaying/not-found-card'
import {connectToMongoDB} from '@/database/databaseConection'
import InstanceModel, {Instance} from '@/database/models/Instance.model'

interface Props {
  params: Promise<{instance: string}>
}

export default async function InstanceLandingPage({params}: Props) {
  const instanceName = (await params).instance

  connectToMongoDB()
  const instance: Instance = await InstanceModel.findOne({
    name: instanceName,
  }).exec()

  if (!instance) {
    return <NotFoundCard />
  }

  return (
    <section className="w-full h-full flex items-center justify-center">
      <h1>{`Bienvenido a la instancia ${instance.fullname}`}</h1>
    </section>
  )
}
