import {auth} from '@/auth'
import ContactCard from '@/components/boards/_cards/contact-card'
import DescriptionCard from '@/components/boards/_cards/description-card'
import GroupInfoCard from '@/components/boards/_cards/group-info-card'
import ImageCard from '@/components/boards/_cards/image-card'
import NotFoundCard from '@/components/displaying/404-not-found'
import MembershipRequestBanner from '@/components/boards/_interaction/membership-request-banner'
import {PopulatedGroup} from '@/database/models/Group.model'
import {getOneGroup} from '@/database/services/group.services'
import {Session} from 'next-auth'
import PageContainer from '@/components/containing/page-container'
import InstanceCard from '@/components/boards/_cards/instance-card'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupLandingPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener la sesión de usuario
  const session: Session | null = await auth()
  const userId = session?.user?._id

  // Verificar si el usurio tiene petición pendiente
  let hasPendingRequest = false
  if (userId && group) {
    group.member_requests.map((request) => {
      if (request.user._id.toString() == userId) {
        hasPendingRequest = true
      }
    })
  }
  // Validar roles de usuario:
  let isMember = false
  if (userId && group) {
    group.members.map((member) => {
      if (member._id === userId) {
        isMember = true
      }
    })
  }

  if (!group) {
    return (
      <PageContainer>
        <NotFoundCard
          title="Algo ha ido mal"
          text="Ha habido un error al cargar los datos, intentalo de nuevo mas tarde"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {!isMember && (
        <MembershipRequestBanner
          groupId={group._id}
          userId={userId}
          hasPendingRequest={hasPendingRequest}
        />
      )}

      <ImageCard />
      <div className="flex gap-4 flex-wrap justify-center">
        {group.instances.map((instance) => {
          return (
            <InstanceCard
              glassmorphism={false}
              key={instance.name}
              instance={instance}
            />
          )
        })}
        <GroupInfoCard
          fullname={group.fullname}
          name={group.name}
          acronym={group.acronym}
          _id={group._id}
          group_categories={group.group_categories}
        />
        <ContactCard
          street={group.street}
          portal_number={group.portal_number}
          floor={group.floor}
          door={group.door}
          postal_code={group.postal_code}
          city={group.city}
          province={group.province}
          country={group.country}
          phone={group.phone}
          email={group.email}
          webpage={group.webpage}
        />
        <DescriptionCard description={group.description} />
      </div>
    </PageContainer>
  )
}
