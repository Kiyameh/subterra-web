import {auth} from '@/auth'
import CustomCard from '@/components/containing/custom-card'
import BackButton from '@/components/navigation/back-button'
import LinkButton from '@/components/navigation/link-button'
import {GroupFormValues} from '@/database/validation/group.schema'
import {FiAlertTriangle} from 'react-icons/fi'
import GroupForm from '../components/group-form'

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
    <main className="min-h-full p-8 flex items-center justify-center">
      <section>
        {userId ? (
          <GroupForm
            initialData={EMPTY_GROUP}
            editor={userId}
          />
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
      </section>
    </main>
  )
}
