import BackButton from '../navigation/back-button'
import LinkButton from '../navigation/link-button'
import programingImage from '@/public/401.webp'
import SimpleCard from '../containing/simple-card'
import {RiForbidFill} from 'react-icons/ri'

interface InDevelopmentCardProps {
  title?: string
  text?: string
}

/**
 * Card personalizada para mostrar que una funcionalidad está en desarrollo
 * @param {string} title Título de la card
 * @param {string} text Texto de la card
 *
 * Textos por defecto:
 * "En desarrollo"
 * "Funcionalidad en desarrollo. Próximamente estará disponible"
 */

export default function UnauthorizedCard({
  title = 'No autorizado',
  text = 'Ups, parece que no estas autorizado para esto. Contacta con el responsable para obtener acceso',
}: InDevelopmentCardProps) {
  return (
    <SimpleCard
      image={programingImage}
      title={title}
      code="401"
      icon={<RiForbidFill />}
      content={text}
      action1={<BackButton />}
      action2={
        <LinkButton
          label="Enviar comentarios"
          href="/contact"
        />
      }
    />
  )
}
