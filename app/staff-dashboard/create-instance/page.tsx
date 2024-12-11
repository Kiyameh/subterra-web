import {auth} from '@/auth'

import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/platform.services'

import PageContainer from '@/components/containing/page-container'
import BasicCard from '@/components/containing/basic-card'
import CreateInstanceForm from '@/components/staff/create-instance-form'
import InstanceMessagesBoard from '@/components/staff/instance-messages-board'

import {LuBox} from 'react-icons/lu'

export default async function CreateInstancePage() {
  const subterra = (await getOnePlatform('subterra'))
    .content as PlatformObject | null

  const session = await auth()
  const userId = session?.user?._id

  return (
    <PageContainer className="flex flex-row gap-4">
      {subterra && (
        <InstanceMessagesBoard messages={subterra.instance_requests} />
      )}
      {userId && (
        <BasicCard
          defaultWidth="xl"
          cardHeader={
            <div className="flex items-center gap-2 text-xl">
              <LuBox className="text-3xl text-emphasis" />
              <span>Crear una instancia</span>
            </div>
          }
        >
          <CreateInstanceForm commanderId={userId} />
        </BasicCard>
      )}
    </PageContainer>
  )
}
