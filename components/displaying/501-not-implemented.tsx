import {FaLaptopCode} from 'react-icons/fa'
import BackButton from '../navigation/back-button'
import LinkButton from '../navigation/link-button'
import programingImage from '@/public/501.webp'
import SimpleCard from '../containing/simple-card'

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

export default function InDevelopmentCard({
  title = 'En desarrollo',
  text = 'Funcionalidad en desarrollo. Próximamente estará disponible',
}: InDevelopmentCardProps) {
  return (
    <SimpleCard
      image={programingImage}
      title={title}
      code="501"
      icon={<FaLaptopCode />}
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
