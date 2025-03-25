import {auth} from '@/auth'

import {Button} from '@/components/Atoms/button'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import BackButton from '@/components/Molecules/buttons/back-button'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import PageContainer from '@/components/Organisms/theme/page-container'
import LoginWrapper from '@/components/Organisms/authentication/login-wrapper'
import GroupCreationForm from '@/components/Templates/groups/group-creation-form'

import {FiAlertTriangle} from 'react-icons/fi'

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
              <LoginWrapper>
                <Button>Iniciar sesión</Button>
              </LoginWrapper>
            </div>
          }
        >
          Es necesario iniciar sesión para crear un grupo
        </BasicCard>
      )}
    </PageContainer>
  )
}
