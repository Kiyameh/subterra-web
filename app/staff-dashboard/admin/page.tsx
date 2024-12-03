import {LinkSlot} from '@/components/boards/_slots/link-slots'
import {TextSlot} from '@/components/boards/_slots/text-slots'
import BasicCard from '@/components/containing/basic-card'
import PageContainer from '@/components/containing/page-container'
import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/platform.services'

export default async function StaffDashboardPage() {
  const subterra = (await getOnePlatform('subterra'))
    .content as PlatformObject | null
  return (
    <PageContainer>
      <BasicCard
        defaultWidth="xl"
        cardHeader="Mensajes de contacto"
      >
        {subterra?.contact_messages.map((message, index) => (
          <div key={index}>
            <TextSlot
              label="Usuario"
              value={message.user.toString()}
            />
            <LinkSlot
              label="Email"
              value={message.email}
              type="email"
            />
            <TextSlot
              label="Asunto"
              value={message.subject}
            />
            <TextSlot
              label="Mensaje"
              value={message.message}
            />
          </div>
        ))}
      </BasicCard>
      <BasicCard
        defaultWidth="xl"
        cardHeader="Solicitudes de instancias"
      >
        {subterra?.instance_requests.map((request, index) => (
          <div key={index}>
            <TextSlot
              label="Usuario"
              value={request.user.toString()}
            />
            <TextSlot
              label="Grupo"
              value={request.group.toString()}
            />
            <TextSlot
              label="Nombre"
              value={request.fullname}
            />
            <TextSlot
              label="Descripción"
              value={request.description}
            />
            <TextSlot
              label="Territorio"
              value={request.territory}
            />
            <TextSlot
              label="Roles"
              value={request.roles}
            />
            <TextSlot
              label="Mensaje"
              value={request.message}
            />
          </div>
        ))}
      </BasicCard>
    </PageContainer>
  )
}
