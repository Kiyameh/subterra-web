import BasicCard from '@/components/_Atoms/boxes/basic-card'
import BackButton from '@/components/_Atoms/buttons/back-button'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import unauthorizedImage from '@/public/401.webp'
import {RiForbidFill} from 'react-icons/ri'

/**
 * @version 1
 * @description Card personalizada para mostrar que una funcionalidad está en desarrollo
 * @param title Título de la card
 * @param text Texto de la card
 * @param redirectLabel Texto del botón de redirección
 * @param redirectUrl URL a la que redirige el botón
 * @default
 * 'No autorizado'
 * 'Ups, parece que no estas autorizado para esto. Contacta con el responsable para obtener acceso'
 */

export default function UnauthorizedCard({
  title = 'No autorizado',
  text = 'Ups, parece que no estas autorizado para esto. Contacta con el responsable para obtener acceso',
  redirectLabel,
  redirectUrl,
  showContactButton = true,
}: {
  title?: string
  text?: string
  redirectLabel?: string
  redirectUrl?: string
  showContactButton?: boolean
}) {
  return (
    <BasicCard
      image={unauthorizedImage}
      cardHeader={
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl">
            <RiForbidFill />
            {title}
          </div>
          <a
            href={'https://http.cat/status/401'}
            target="_blank"
            className="text-2xl text-foreground/20"
          >
            401
          </a>
        </div>
      }
      cardFooter={
        <div className="w-full gap-2 flex justify-between">
          {redirectUrl ? (
            <LinkButton
              label={redirectLabel || 'Volver'}
              href={redirectUrl}
              variant={'secondary'}
            />
          ) : (
            <BackButton />
          )}
          {showContactButton && (
            <LinkButton
              label="Enviar comentarios"
              href="/contact"
            />
          )}
        </div>
      }
    >
      {text}
    </BasicCard>
  )
}
