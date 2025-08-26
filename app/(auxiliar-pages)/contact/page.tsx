import {auth} from '@/auth'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import PageContainer from '@/components/Organisms/theme/page-container'
import ContactForm from '@/components/Templates/staff-dashboard/floating-contact-form/contact-form'

export default async function ContactPage() {
  const user = (await auth())?.user

  return (
    <PageContainer>
      <CardWithHeader>
        <ContactForm commander={user} />
      </CardWithHeader>
    </PageContainer>
  )
}
