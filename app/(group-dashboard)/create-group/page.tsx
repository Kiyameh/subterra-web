import {auth} from '@/auth'
import CustomCard from '@/components/containing/simple-card'
import CreateGroupForm from '@/components/forms/create-group-form'
import BackButton from '@/components/navigation/back-button'
import LinkButton from '@/components/navigation/link-button'
import {GroupFormValues} from '@/database/validation/group.schema'
import {FiAlertTriangle} from 'react-icons/fi'
import PageContainer from '@/components/containing/page-container'
import CardWithHeader from '@/components/containing/card-with-header'

export default async function CreateGroupPage() {
  const session = await auth()
  const userId = session?.user?._id

  const EMPTY_GROUP: GroupFormValues = {
    name: '',
    fullname: '',
    acronym: '',
    description: '',
    group_categories: [],
    main_image: '',
    logo_image: '',
    street: '',
    portal_number: '',
    floor: '',
    door: '',
    postal_code: 0,
    city: '',
    province: '',
    country: '',
    phone: '',
    email: '',
    webpage: '',
  }

  return (
    <PageContainer className="justify-center">
      {userId ? (
        <CardWithHeader defaultWidth="xl">
          <CreateGroupForm
            initialData={EMPTY_GROUP}
            editor={userId}
          />
        </CardWithHeader>
      ) : (
        <CustomCard
          icon={<FiAlertTriangle />}
          title={'Inicia sesión'}
          action1={<BackButton />}
          action2={
            <LinkButton
              href="/auth/login"
              label="Iniciar sesión"
            />
          }
        >
          Es necesario iniciar sesión para crear un grupo
        </CustomCard>
      )}
    </PageContainer>
  )
}
