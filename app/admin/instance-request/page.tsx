import {auth} from '@/auth'

import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/platform.services'

import BasicCard from '@/components/_Atoms/boxes/basic-card'
import InstanceCreationForm from '@/components/_Organisms/forms/instance-creation-form'
import InstanceMessagesBoard from '@/components/_Organisms/boards/instance-messages-board'

import {LuBox} from 'react-icons/lu'

export default async function CreateInstancePage() {
  const subterra = (await getOnePlatform('subterra'))
    .content as PlatformObject | null

  const session = await auth()
  const userId = session?.user?._id

  return (
    <div className="flex flex-row gap-4">
      {subterra && (
        <InstanceMessagesBoard messages={subterra.instance_requests} />
      )}
      {userId && (
        <BasicCard
          defaultWidth="lg"
          cardHeader={
            <div className="flex items-center gap-2 text-xl">
              <LuBox className="text-3xl text-staff" />
              <span>Crear una instancia</span>
            </div>
          }
        >
          <InstanceCreationForm commanderId={userId} />
        </BasicCard>
      )}
    </div>
  )
}
