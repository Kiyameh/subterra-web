import CardTitle from '@/components/_Atoms/boxes/card-title'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import SquareButton from '@/components/_Atoms/buttons/square-button'
import PageContainer from '@/components/theming/page-container'
import Link from 'next/link'
import {RxNotionLogo} from 'react-icons/rx'
import {FaMapSigns} from 'react-icons/fa'
import InfoBox from '@/components/_Atoms/boxes/info-box'

export default function NextPage() {
  return (
    <PageContainer>
      <CardWithHeader
        cardSubHeader={
          <CardTitle
            icon={<FaMapSigns />}
            title="Hoja de ruta"
          />
        }
      >
        <div className="space-y-4 flex flex-col items-center">
          <Link href="https://woolly-silk-b0e.notion.site/Roadmap-1781a4be7fa680a8a249d092c79d51b1?pvs=4">
            <SquareButton
              icon={<RxNotionLogo />}
              text="Hoja de ruta"
              color="staff"
            />
          </Link>
          <InfoBox
            title="Funcionalidades en desarrollo"
            color="info"
            className="space-y-6"
          >
            <div className="space-y-4">
              <p>
                ● En este enlace puedes acceder a la página de Notion con las
                funcionalidades que están planificadas.
              </p>
              <p>
                ● Puedes dejarnos tus comentarios en el formulario de contacto o
                a traves del correo{' '}
                <a
                  className="text-emphasis"
                  href="mailto:info@subterra.app"
                >
                  info@subterra.app
                </a>{' '}
              </p>
              <p className="text-center">¡Gracias!</p>
            </div>
          </InfoBox>
          <LinkButton
            variant={'secondary'}
            href="/contact"
            label="Contacto"
          />
        </div>
      </CardWithHeader>
    </PageContainer>
  )
}
