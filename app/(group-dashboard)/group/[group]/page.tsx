import {auth} from '@/auth'
import ContactCard from '@/components/boards/_cards/contact-card'
import DescriptionCard from '@/components/boards/_cards/description-card'
import GroupInfoCard from '@/components/boards/_cards/group-info-card'
import ImageCard from '@/components/boards/_cards/image-card'
import NotFoundCard from '@/components/displaying/404-not-found'
import MembershipRequestBanner from '@/components/boards/_interaction/membership-request-banner'
import {PopulatedGroup} from '@/database/models/Group.model'
import {checkIsMember, getOneGroup} from '@/database/services/group.services'
import PageContainer from '@/components/containing/page-container'
import InstanceCard from '@/components/boards/_cards/instance-card'
import {getSomeInstances} from '@/database/services/instance.services'
import {PopulatedInstance} from '@/database/models/Instance.model'

interface PageProps {
  params: Promise<{group: string}>
}

export default async function GroupLandingPage({params}: PageProps) {
  // Obtener el nombre del grupo
  const groupName: string = (await params).group

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener instancias populadas del grupo
  const instances = (await getSomeInstances(group?.instances)).content as
    | PopulatedInstance[]
    | null

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id as string | null

  // Validar roles de usuario
  const isMember = (await checkIsMember(groupName, userId)).ok as boolean

  // Verificar si el usurio tiene petición pendiente
  const hasPendingRequest: boolean | undefined = group?.member_requests.some(
    (request) => request.user._id.toString() === userId
  )

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
    <PageContainer className="justify-start">
      {!isMember && (
        <MembershipRequestBanner
          groupId={group._id}
          userId={userId}
          hasPendingRequest={hasPendingRequest}
        />
      )}

      <ImageCard />
      <div className="flex gap-4 flex-wrap justify-center">
        {instances &&
          instances.map((instance) => {
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
