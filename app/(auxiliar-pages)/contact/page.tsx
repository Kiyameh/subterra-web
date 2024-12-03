import {auth} from '@/auth'
import CardWithHeader from '@/components/containing/card-with-header'
import CollapsibleBox from '@/components/containing/collapsible-box'
import PageContainer from '@/components/containing/page-container'
import ContactForm from '@/components/forms/contact-form'
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
