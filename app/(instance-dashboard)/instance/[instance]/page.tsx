import NotFoundCard from '@/components/displaying/404-not-found'
import {PopulatedInstance} from '@/database/models/Instance.model'
import {getInstanceByName} from '@/database/services/instance.services'
import Image from 'next/image'

interface Props {
  params: Promise<{instance: string}>
}

export default async function InstanceLandingPage({params}: Props) {
  const instanceName = (await params).instance
  const answer = await getInstanceByName(instanceName)

  if (!answer.ok) {
    return <NotFoundCard />
  }

  const instance = answer.content as PopulatedInstance

  return (
    <section className="w-full h-full flex items-center justify-center">
      <Image
        src={instance.map_image}
        alt={instance.name}
        width={300}
        height={300}
        className="rounded-lg"
      />
    </section>
  )
}
