import {auth} from '@/auth'
import BasicCard from '@/components/containing/basic-card'
import CreateGroupForm from '@/components/forms/create-group-form'
import BackButton from '@/components/navigation/back-button'
import LinkButton from '@/components/navigation/link-button'
import {FiAlertTriangle} from 'react-icons/fi'
import PageContainer from '@/components/containing/page-container'
import CardWithHeader from '@/components/containing/card-with-header'

export default async function CreateGroupPage() {
  const session = await auth()
  const userId = session?.user?._id

  return (
    <PageContainer className="justify-center">
      {userId ? (
        <CardWithHeader defaultWidth="xl">
          <CreateGroupForm commander={userId} />
        </CardWithHeader>
      ) : (
        <BasicCard
          cardHeader={
            <div className="flex items-center gap-4 flex-wrap">
              <FiAlertTriangle className="text-2xl" />
              <h1 className="text-lg">Inicia sesión</h1>
            </div>
          }
          cardFooter={
            <div className="flex items-center gap-2 w-full">
              <BackButton />
              <LinkButton
                href="/auth/login"
                label="Iniciar sesión"
              />
            </div>
          }
        >
          Es necesario iniciar sesión para crear un grupo
        </BasicCard>
      )}
    </PageContainer>
  )
}
