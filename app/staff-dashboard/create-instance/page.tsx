import {auth} from '@/auth'
import CardWithHeader from '@/components/containing/card-with-header'
import PageContainer from '@/components/containing/page-container'
import UnauthorizedCard from '@/components/displaying/401-unauthorized'
import CreateInstanceForm from '@/components/staff/create-instance-form'

export default async function CreateInstancePage() {
  const session = await auth()
  const userId = session?.user?._id

  return (
    <PageContainer>
      {userId ? (
        <CardWithHeader
          defaultWidth="xl"
          cardSubHeader="Crear una instancia"
        >
          <CreateInstanceForm commander={userId} />
        </CardWithHeader>
      ) : (
        <UnauthorizedCard />
      )}
    </PageContainer>
  )
}
