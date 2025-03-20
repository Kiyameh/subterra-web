import {auth} from '@/auth'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import ContactForm from '@/components/Templates/staff-dashboard/floating-contact-form/contact-form'
import PageContainer from '@/components/Organisms/theme/page-container'

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
