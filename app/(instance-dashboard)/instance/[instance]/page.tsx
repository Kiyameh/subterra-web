import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import InDevelopmentCard from '@/components/_Molecules/cards/501-not-implemented'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneInstance} from '@/database/services/instance.services'

interface Props {
  params: Promise<{instance: string}>
}

export default async function InstanceLandingPage({params}: Props) {
  const instanceName = (await params).instance
  const answer = await getOneInstance(instanceName)

  if (!answer.ok) {
    return <NotFoundCard />
  }

  const instance = answer.content as PopulatedInstance
  console.log(instance)

  return (
    <section className="w-full h-full flex items-center justify-center">
      <InDevelopmentCard title="LandingPage de instancia" />
    </section>
  )
}
