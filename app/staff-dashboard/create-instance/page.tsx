import {auth} from '@/auth'
import BasicCard from '@/components/containing/basic-card'
import PageContainer from '@/components/containing/page-container'
import UnauthorizedCard from '@/components/displaying/401-unauthorized'
import CreateInstanceForm from '@/components/staff/create-instance-form'
import InstanceMessagesBoard from '@/components/staff/instance-messages-board'
import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/platform.services'

export default async function CreateInstancePage() {
  const session = await auth()
  const userId = session?.user?._id

  const subterra = (await getOnePlatform('subterra'))
    .content as PlatformObject | null

  return (
    <PageContainer className="flex flex-row gap-4">
      {subterra && (
        <InstanceMessagesBoard messages={subterra.instance_requests} />
      )}
      {userId ? (
        <BasicCard
          defaultWidth="xl"
          cardHeader="Crear una instancia"
        >
          <CreateInstanceForm commander={userId} />
        </BasicCard>
      ) : (
        <UnauthorizedCard />
      )}
    </PageContainer>
  )
}
