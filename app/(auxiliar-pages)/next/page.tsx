import CardTitle from '@/components/_Atoms/boxes/card-title'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import PageContainer from '@/components/theming/page-container'
import {RxGithubLogo} from 'react-icons/rx'
import {FaMapSigns} from 'react-icons/fa'
import InfoBox from '@/components/_Atoms/boxes/info-box'
import {Button} from '@/components/ui/button'

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
          <a
            href="https://github.com/users/Kiyameh/projects/2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              <RxGithubLogo />
              Versión 1.2.0 - Coventosa
            </Button>
          </a>
          <a
            href="https://github.com/users/Kiyameh/projects/4/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              <RxGithubLogo />
              Versión 1.3.0 - Ormazarreta
            </Button>
          </a>
          <InfoBox
            title="Funcionalidades en desarrollo"
            color="info"
            className="space-y-6"
          >
            <div className="space-y-4">
              <p>
                ● En los enlaces de GitHub puedes consultar las próximas
                novedades que estamos desarrollando
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
