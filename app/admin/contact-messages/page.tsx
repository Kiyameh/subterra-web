import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/Platform/getOnePlatform'

import ContactMessagesBoard from '@/components/Templates/staff-dashboard/contact-messages-board'

export default async function StaffDashboardPage() {
  // Obtener la plataforma
  const subterra = (await getOnePlatform()).content as
    | PlatformObject
    | undefined

  return (
    <div>
      {subterra && (
        <ContactMessagesBoard messages={subterra.contact_messages} />
      )}
    </div>
  )
}
