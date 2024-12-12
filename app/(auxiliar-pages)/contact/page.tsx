import {auth} from '@/auth'
import ContactForm from '@/components/_Organisms/forms/contact-form'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import PageContainer from '@/components/theming/page-container'

import {BiSolidMessage} from 'react-icons/bi'

export default async function ContactPage() {
  const session = await auth()
  const user = session?.user

  return (
    <PageContainer>
      <CardWithHeader
        cardSubHeader={
          <CollapsibleBox
            title="Contacto"
            icon={<BiSolidMessage />}
            color="info"
          >
            <p>● Envía un mensaje a los administradores de la plataforma.</p>
            <p>● Ten paciencia, responderán lo más pronto posible.</p>
          </CollapsibleBox>
        }
      >
        <ContactForm commander={user || undefined} />
      </CardWithHeader>
    </PageContainer>
  )
}
