import {auth} from '@/auth'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import BackButton from '@/components/_Atoms/buttons/back-button'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {FiAlertTriangle} from 'react-icons/fi'
import PageContainer from '@/components/theming/page-container'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import GroupCreationForm from '@/components/_Organisms/forms/group-creation-form'

export default async function GroupCreationPage() {
  const session = await auth()
  const userId = session?.user?._id

  return (
    <PageContainer className="justify-center">
      {userId ? (
        <CardWithHeader defaultWidth="xl">
          <GroupCreationForm commander={userId} />
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
