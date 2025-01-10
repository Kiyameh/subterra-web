import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/platform.services'

import ContactMessagesBoard from '@/components/_Organisms/boards/contact-messages-board'

export default async function StaffDashboardPage() {
  const subterra = (await getOnePlatform('subterra'))
    .content as PlatformObject | null

  return (
    <div>
      {subterra && (
        <ContactMessagesBoard messages={subterra.contact_messages} />
      )}
    </div>
  )
}
