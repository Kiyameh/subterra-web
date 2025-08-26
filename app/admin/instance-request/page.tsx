import {auth} from '@/auth'

import {getOnePlatform} from '@/database/services/Platform/getOnePlatform'
import {type PlatformObject} from '@/database/models/Platform.model'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import InstanceCreationForm from '@/components/Templates/staff-dashboard/instance-creation-form'
import InstanceMessagesBoard from '@/components/Templates/staff-dashboard/instance-messages-board'

import {LuBox} from 'react-icons/lu'

export default async function CreateInstancePage() {
  // Obtener la plataforma
  const subterra = (await getOnePlatform()).content as
    | PlatformObject
    | undefined
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
