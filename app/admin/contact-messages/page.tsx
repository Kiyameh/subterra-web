import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/platform.services'

import PageContainer from '@/components/theming/page-container'
import ContactMessagesBoard from '@/components/_Organisms/boards/contact-messages-board'

export default async function StaffDashboardPage() {
  const subterra = (await getOnePlatform('subterra'))
    .content as PlatformObject | null

  return (
    <PageContainer>
      {subterra && (
        <ContactMessagesBoard messages={subterra.contact_messages} />
      )}
    </PageContainer>
  )
}
