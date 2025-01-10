import {auth} from '@/auth'

import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import ContactForm from '@/components/_Organisms/forms/contact-form'
import PageContainer from '@/components/theming/page-container'

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
